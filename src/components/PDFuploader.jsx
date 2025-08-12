"use client";

import React, { useState } from "react";
import Message from "./Message";
import GradientView from './Gradiant-text';
import { GradientText } from './Gradiant-text';
import GlowLine from './Glow-line'; // Your Gradient component

export default function UploadPage() {
  const [pdfName, setPdfName] = useState("");
  const [pdfId, setPdfId] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);

    setPdfName("");
    setPdfId("");
    setSummary("");
    setStatusMessage("");
    setStatusType("");
  };

  // Upload PDF
  const uploadFile = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError("");
    setStatusMessage("");
    setStatusType("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload PDF.");

      const data = await response.json();

      setPdfName(selectedFile.name);
      setPdfId(data.pdfId);
      setSummary(data.summary);

      setStatusType(
        data.message?.toLowerCase().includes("duplicate") ? "warning" : "success"
      );
      setStatusMessage(data.message || "Upload successful!");
    } catch (err) {
      console.error("❌ Upload Error:", err);
      setError("Upload Failed. Try again.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleComplete = () => {
    setSelectedFile(null);
    setPdfName("");
    setPdfId("");
    setSummary("");
    setError("");
    setStatusMessage("");
    setStatusType("");
    setLoading(false);
    document.getElementById("pdf-upload-input").value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <div className="relative w-full h-1 mb-12">
        <GlowLine orientation="horizontal" position={0} color="blue" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">

        
        {/* PDF Uploader Card */}
        <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Upload a PDF</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select a PDF file from your device. After uploading, a unique PDF ID
              will be generated and its summary will be shown.
            </p>

            <input
              id="pdf-upload-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="mb-4 block w-full text-sm text-gray-700 dark:text-gray-300 
                file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm 
                file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={uploadFile}
                disabled={loading || !selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>

              <button
                type="button"
                onClick={handleComplete}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Complete
              </button>
            </div>

            {statusMessage && <Message type={statusType}>{statusMessage}</Message>}
            {error && <Message type="error">{error}</Message>}

            {pdfName && pdfId && (
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>PDF Name:</strong> {pdfName}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>PDF ID:</strong> {pdfId}
                  </p>
                </div>

                <div className="p-3 rounded border bg-gray-100 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100">
                  <strong>Summary:</strong>
                  <p className="mt-1 whitespace-pre-line">{summary}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Card */}
        <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col justify-center">
          <div>
            <h2 className="text-4xl font-semibold mb-6">
              <GradientText>How This Uploader Works</GradientText>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
              Easily upload your project proposal as a PDF to receive a quick
              summary and a unique registration ID. This ensures your work is
              securely stored and uniquely identified.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-justify">
              Our tool also checks for similar submissions to avoid duplication,
              helping you protect your original ideas and streamline project
              tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
