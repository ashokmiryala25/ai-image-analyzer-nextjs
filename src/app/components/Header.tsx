"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eaeaea",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0078d4",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        zIndex: 1000,
        boxSizing: "border-box",
        minHeight: "56px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", whiteSpace: "nowrap" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Ashok's AI Projects
        </Link>
      </h1>

      <nav style={{ display: "flex", alignItems: "center" }}>
        <Link href="/" style={navLinkStyle}>
          Home
        </Link>
        <Link href="/image-analyzer" style={navLinkStyle}>
          Image Analyzer
        </Link>
        <Link href="/resume-analyzer" style={navLinkStyle}>
          Resume Analyzer
        </Link>
        {/* <Link href="/nextjs-features" style={navLinkStyle}>
          Next.js Features
        </Link> */}
      </nav>
    </header>
  );
}

const navLinkStyle = {
  marginLeft: "1.5rem",
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  whiteSpace: "nowrap",
};
