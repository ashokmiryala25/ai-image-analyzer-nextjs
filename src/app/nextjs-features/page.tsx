import Link from "next/link";
import Layout from "../components/Layout";
import type { CSSProperties } from "react";

export default function NextjsFeaturesPage() {
  const features = [
    { href: "/nextjs-features/ssr-example", label: "Server-Side Rendering	On every request	Dynamic pages, user-specific content" },
    { href: "/nextjs-features/ssg-example/post-1", label: "Static Site Generation	At build time	Blog posts, marketing pages" },
    { href: "/nextjs-features/api-example/api/hello", label: "API Example" },
    { href: "/nextjs-features/server-actions/form", label: "Server Actions" },
  ];

  return (
    <Layout>
      <main style={mainStyle}>
        <h1 style={titleStyle}>Next.js Features</h1>
        <div style={cardContainer}>
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <div style={cardStyle}>
                <h2>{feature.label} →</h2>
                <p>Learn how {feature.label.toLowerCase()} works in Next.js.</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

// ✅ Typed styles
const mainStyle: CSSProperties = {
  padding: "2rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle: CSSProperties = {
  fontSize: "2rem",
  marginBottom: "1.5rem",
};

const cardContainer: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "1.5rem",
};

const cardStyle: CSSProperties = {
  padding: "1.25rem",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  textDecoration: "none",
  color: "inherit",
  backgroundColor: "#fff",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
};


// Acronym	Stands For	When It Runs	Common Use Case
// SSR	Server-Side Rendering	On every request	Dynamic pages, user-specific content
// SSG	Static Site Generation	At build time	Blog posts, marketing pages
// ISR	Incremental Static Regeneration	Initially at build, then periodically	News, product listings, semi-frequent updates
// CSR	Client-Side Rendering	In browser after page load	Dashboards, dynamic UIs that don’t need SEO

