
"use client";
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function CSRPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const data: Post[] = await res.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading posts...</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Client-Side Rendered Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}


// What is CSR (Client-Side Rendering)?
// In CSR, the page loads with minimal HTML, and all data is fetched in the browser after the initial load using useEffect or SWR, not during build or server time.

// CSR is good when:

// You don’t need SEO for that page

// Content is user-specific, dynamic, or frequently changing

// Key Points
// This runs entirely on the client — no getStaticProps, getServerSideProps, or revalidate.

// SEO is minimal since content loads after the page renders.

// Ideal for dashboards, admin panels, or user-specific data.