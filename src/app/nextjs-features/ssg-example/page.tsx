// File: pages/blog/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
// 1. Define TypeScript types
type Post = {
  id: string;
  title: string;
  content: string;
};

type BlogPostProps = {
  post: Post;
};

// 2. getStaticPaths - Define dynamic routes to pre-build
export const getStaticPaths: GetStaticPaths = async () => {
  // Simulate API call to get all post IDs
  const posts = [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false, // Show 404 for any other path
  };
};

// 3. getStaticProps - Fetch data for each path
export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const { id } = params as { id: string };

  // Simulate API call for a single post
  const post = {
    id,
    title: `This is blog post #${id}`,
    content: `Hello! This is the content of post ${id}. It was statically generated.`,
  };

  return {
    props: {
      post,
    },
  };
};

// 4. Page component - receives `post` as prop
export default function BlogPost({ post }: BlogPostProps) {
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