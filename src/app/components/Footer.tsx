export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "1rem 2rem",
        borderTop: "1px solid #eaeaea",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#666",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        marginTop: "auto",
        backgroundColor: "#f5f5f5",
      }}
    >
      &copy; {new Date().getFullYear()} Ashok Miryala. All rights reserved.
    </footer>
  );
}
