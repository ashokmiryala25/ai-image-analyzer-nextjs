"use client";
import { useState } from "react";
import Layout from "../components/Layout";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Step 1: Upload to Azure Blob
  const uploadToBlob = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-to-blob", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Upload failed.");
        return null;
      }
      const { blobName } = await response.json();

      return blobName;
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
      return null;
    }
  };

  // Step 2: Analyze Resume
  const analyzeBlob = async (blobName: string) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blobName }),
      });
     
      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Analysis failed.");
        return;
      }

      const { analysis } = await response.json();
      setAnalysis(analysis);
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Resume analysis failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    const blobName = await uploadToBlob();
    if (blobName) {
      await analyzeBlob(blobName);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h2>Resume Analyzer</h2>
      <p>Upload your resume to get insights using Azure OpenAI.</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "500px",
          marginTop: "2rem",
          padding: "2rem",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <label
          htmlFor="resume"
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            width: "100%",
            textAlign: "left",
          }}
        >
          Upload Resume
        </label>

        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "0.95rem",
          }}
        />

        {fileName && (
          <p style={{ fontSize: "0.95rem", color: "#555" }}>
            Selected File: <strong>{fileName}</strong>
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0078d4",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#005ea0";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#0078d4";
          }}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", maxWidth: "600px", whiteSpace: "pre-wrap" }}>
        {analysis && (
          <>
            <h3>Analysis Result:</h3>
            <p>{analysis}</p>
          </>
        )}
      </div>
    </Layout>
  );
}
