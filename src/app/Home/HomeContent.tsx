export default function HomeContent() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem 2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "1rem",
        lineHeight: 1.5,
        color: "#333",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <p style={{ marginBottom: "0.5rem" }}>
        👋 Welcome! This is a demo of AI-based projects built using{" "}
        <strong>Next.js</strong>, <strong>Azure OpenAI</strong>, and{" "}
        <strong>Azure Blob Storage</strong>.
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        ✅ <strong>Image Analyzer</strong> is fully functional — you can upload
        an image and receive AI-generated captions and analysis.
      </p>
      <p>
        ❌ <strong>Resume Analyzer</strong> is currently disabled due to high API
        costs. The code and UI are available in the GitHub repo for reference.
      </p>
    </div>
  );
}
