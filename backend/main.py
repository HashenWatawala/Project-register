import os
import json
import uuid
import hashlib
import re
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from sentence_transformers import SentenceTransformer
import numpy as np

app = FastAPI()

# CORS - Allow your React frontend
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
UPLOAD_DIR = "uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
SUMMARY_FILE = "summaries.json"

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')


# ---------- Utility Functions ----------
def load_summaries():
    """Load existing project summaries from file."""
    if not os.path.exists(SUMMARY_FILE):
        return {}
    try:
        with open(SUMMARY_FILE, "r") as f:
            content = f.read().strip()
            if not content:
                return {}
            return json.loads(content)
    except json.JSONDecodeError:
        return {}


def save_summaries(data):
    """Save project summaries to file."""
    with open(SUMMARY_FILE, "w") as f:
        json.dump(data, f, indent=4)


def extract_text_from_pdf(file_path):
    """Extract all text from a PDF file."""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()


def simple_summary(text, max_sentences=3):
    """Create a simple summary from the first few sentences."""
    sentences = re.split(r'(?<=[.!?]) +', text.strip())
    return " ".join(sentences[:max_sentences]) if sentences else "No text found."


def get_text_hash(text: str):
    """Generate SHA-256 hash of text."""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def get_embedding(text: str):
    """Generate embedding vector for text."""
    return model.encode(text)


def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors."""
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


# ---------- API Endpoint ----------
@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files allowed")

    # Read uploaded file content
    content = await file.read()
    summaries = load_summaries()

    # Save PDF temporarily
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(content)

    # Extract text & prepare for checks
    full_text = extract_text_from_pdf(file_path)
    if not full_text.strip():
        raise HTTPException(status_code=400, detail="No readable text found in PDF.")

    text_hash = get_text_hash(full_text)
    new_embedding = get_embedding(full_text)

    # ---------- Exact Duplicate Check (Hash) ----------
    for proj_id, info in summaries.items():
        if info.get("text_hash") == text_hash:
            return {
                "pdfId": proj_id,
                "summary": info["summary"],
                "message": "Duplicate project detected (same content)!"
            }

    # ---------- Similarity Check (Embedding) ----------
    for proj_id, info in summaries.items():
        if "embedding" in info:
            existing_embedding = np.array(info["embedding"])
            similarity = cosine_similarity(new_embedding, existing_embedding)
            if similarity > 0.90:  # 90% similar
                return {
                    "pdfId": proj_id,
                    "summary": info["summary"],
                    "message": "Project idea already exists (similar content detected)!"
                }

    # ---------- Not duplicate → Save project ----------
    summary_text = simple_summary(full_text)
    project_id = str(uuid.uuid4())

    summaries[project_id] = {
        "filename": file.filename,
        "summary": summary_text,
        "text_hash": text_hash,
        "embedding": new_embedding.tolist()  # store as list for JSON
    }
    save_summaries(summaries)

    return {"pdfId": project_id, "summary": summary_text, "message": "Upload successful!"}
