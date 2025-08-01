"use client";
import Layout from "../components/Layout";
import React, { useState } from "react";

export default function ImageAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setResult(null);
    const file = e.target.files?.[0];
      if (file) {
        if (file.size > 4 * 1024 * 1024) {
        setError("File too large. Please upload an image smaller than 4MB.");
        setSelectedFile(null);
        return;
      }  
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
      const file = e.dataTransfer.files?.[0];
      if (file.size > 4 * 1024 * 1024) {
        setError("File too large. Please upload an image smaller than 4MB.");
        setSelectedFile(null);
        return;
      }  
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError("Please drop a valid image file.");
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("/api/image-analyze", {
        method: "POST",
        body: formData,
      });
        debugger;
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.analysis || "No analysis returned");
    } catch (err: any) {
      setError(err.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  }

    return (
      <Layout>
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2>Image Analyzer</h2>

      <form onSubmit={handleSubmit}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #0078d4",
            padding: "2rem",
            textAlign: "center",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9",
          }}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} />
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0078d4",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {result && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            backgroundColor: "#eef6fc",
            borderRadius: 6,
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Analysis Result:</h3>
          <p>{result}</p>
        </div>
      )}
            </div>
            </Layout>
  );
}
