
import { notFound } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  content: string;
};

// Simulate API call for a single post
async function getPost(id: string): Promise<Post | null> {
  // Replace with real API call if needed
  const posts = [
    { id: '1', title: 'This is blog post #1', content: 'Hello! This is the content of post 1. It was statically generated.' },
    { id: '2', title: 'This is blog post #2', content: 'Hello! This is the content of post 2. It was statically generated.' },
    { id: '3', title: 'This is blog post #3', content: 'Hello! This is the content of post 3. It was statically generated.' },
  ];
  return posts.find((p) => p.id === id) || null;
}

// Page component for /ssg-example/[id]
// In app directory, this file should be named [id]/page.tsx for dynamic routing
// For demonstration, we'll use a hardcoded id (e.g., '1')
export default async function BlogPostPage() {
  // In a real app, get id from params: export default async function Page({ params }: { params: { id: string } })
  const id = '1'; // Replace with dynamic param in real usage
  const post = await getPost(id);
  if (!post) return notFound();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}


// summary: SSG with getStaticProps & getStaticPaths
// 📌 What is SSG?
// Static Site Generation (SSG) means your pages are pre-rendered at build time into static HTML. Fast and great for pages that don’t change often.

// 🧱 SSG Functions
// Function	Purpose	When it Runs
// getStaticProps	Fetch data and pass it as props	🔧 At build time
// getStaticPaths	List dynamic routes that should be pre-built	🔧 At build time