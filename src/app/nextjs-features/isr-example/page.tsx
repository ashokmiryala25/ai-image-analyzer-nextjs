// pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

type Post = {
  id: string;
  title: string;
  body: string;
};

type PostPageProps = {
  post: Post;
};

// Fake API
const fetchPostFromAPI = async (id: string): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

const fetchAllPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return res.json();
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;
  const post = await fetchPostFromAPI(id);

  return {
    props: {
      post,
    },
    revalidate: 60, // Regenerate this page at most once every 60 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllPosts();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // Enables ISR for new paths
  };
};

const PostPage = ({ post }: PostPageProps) => {
  const router = useRouter();

  // Optional: loading state for fallback true
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};

export default PostPage;



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