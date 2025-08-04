
import { notFound } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  body: string;
};

// Fetch a single post from API
async function fetchPostFromAPI(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

// Page component for /isr-example/[id]
// In app directory, this file should be named [id]/page.tsx for dynamic routing
// For demonstration, we'll use a hardcoded id (e.g., '1')
export default async function PostPage() {
  // In a real app, get id from params: export default async function Page({ params }: { params: { id: string } })
  const id = '1'; // Replace with dynamic param in real usage
  const post = await fetchPostFromAPI(id);
  if (!post) return notFound();
  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}



// Explanation:
// getStaticProps runs at build time, but with ISR, the page can re-build in the background every 60 seconds when someone visits it.

// revalidate: 60 means it will serve the existing static page, then generate a new one in the background.

// On the next request (after regeneration is complete), the user sees the updated page.

// 🔧 Learn ISR Hands-On
// Here’s how you can learn ISR effectively:

// Create a small blog app (or product listing) using static data.

// Add a CMS or API call in getStaticProps.

// Add revalidate: 10 and observe behavior after content updates.

// Try changing fallback: true vs fallback: blocking.

// Explore on-demand ISR with API routes and res.revalidate() (Next.js 12+).