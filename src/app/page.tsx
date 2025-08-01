import Layout from "../../src/app/components/Layout";
export default function Home() {
  return (
    <Layout>
    <main
      style={{
        maxWidth: "700px",
        margin: "4rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
        lineHeight: 1.6,
        color: "#333",
      }}
    >
      <p style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
        👋 Welcome! This is a demo of AI-based projects built using{" "}
        <strong>Next.js</strong>, <strong>Azure OpenAI</strong>, and{" "}
        <strong>Azure Blob Storage</strong>.
      </p>
      <p style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
        ✅ <strong>Image Analyzer</strong> is fully functional — you can upload
        an image and receive AI-generated captions and analysis.
      </p>
      <p style={{ fontSize: "1.1rem" }}>
        ❌ <strong>Resume Analyzer</strong> is currently disabled due to high API
        costs. The code and UI are available in the GitHub repo for reference.
      </p>
      </main>
      </Layout>
  );
}
