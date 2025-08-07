"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export default function PdfUploader() {
  const [pdfName, setPdfName] = useState("");
  const [pdfId, setPdfId] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;
  
    const formData = new FormData();
    formData.append("pdf", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("✅ Server Response:", data);
      alert("PDF Uploaded Successfully!");
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("Upload Failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <div className="max-w-md ml-0 md:ml-6 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-2">Upload a PDF</h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select a PDF file from your device. After uploading, a unique PDF ID will be generated automatically.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {pdfName && (
          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-200"><strong>PDF Name:</strong> {pdfName}</p>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 border rounded text-sm text-gray-800 dark:text-gray-100">
              <strong>PDF ID:</strong> {pdfId}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
