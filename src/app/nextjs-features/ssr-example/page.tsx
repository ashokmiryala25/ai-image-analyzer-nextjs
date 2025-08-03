import { GetServerSideProps } from 'next';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
};

type UsersPageProps = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async () => {
  const res = await fetch('https://api.example.com/getAllUsers');
  const users: User[] = await res.json();

  return {
    props: {
      users,
    },
  };
};

export default function UsersPage({ users }: UsersPageProps) {
  const [message, setMessage] = useState<string>('');

  const saveUser = async () => {
    const res = await fetch('/api/saveUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: '123' }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const searchUser = async () => {
    const res = await fetch('/api/searchUser?userId=123');
    const data = await res.json();
    setMessage(`Found user: ${data.name}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User List</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <button onClick={saveUser}>Save User</button>
      <button onClick={searchUser} style={{ marginLeft: '1rem' }}>
        Search User
      </button>

      <p>{message}</p>
    </div>
  );
}

// 🔥 Next.js Data Fetching & Client Interaction Summary
// 1️⃣ getServerSideProps: Server-Side Data Fetching on Page Load
// Runs on the server, before rendering the page.

// Used to fetch data at request time (SSR).

// Must return an object with props.

// Next.js waits for it to finish before rendering the page component.

// Passes fetched data as props to the page component.


// pages/users.js
// Client-Side API Calls on Button Clicks
// User interaction (button clicks) happens on the client (browser).

// Use JavaScript fetch() to call API routes.

// These calls do NOT use getServerSideProps.

// You handle responses inside event handlers.

// API Routes for Serverless Backend Logic
// Create API endpoints under pages/api/ folder.

// Example: /pages/api/saveUser.js, /pages/api/searchUser.js

// These endpoints handle requests from client buttons.

// You can access databases or services here.

// Example /pages/api/saveUser.js:

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const { userId } = req.body;
//     // Save user logic here
//     res.status(200).json({ message: `User ${userId} saved successfully` });
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// 4️⃣ Key Clarifications
// Concept	Explanation
// getServerSideProps	Runs once per request, server-side, before page render.
// Client-side API calls (button click)	Run after page loads, in browser, triggered by user actions.
// Single default export per page	You can have only one export default function per file (your page component).
// Multiple named exports allowed	e.g., export async function getServerSideProps() and others can coexist.

// 5️⃣ Typical Workflow
// Page requested: Next.js runs getServerSideProps on server → fetches data → passes as props.

// Page rendered: Server sends rendered HTML with initial data.

// User interacts: Button clicks call APIs via fetch on client.

// API routes handle requests: Execute backend logic, respond with JSON.

// Client updates UI based on API response.



// Summary of "use client":
// Location	Default component type	"use client" needed?
// /pages directory	Client component	No
// /src/app directory	Server component	Yes, if you use client hooks


// SSR: Server-Side Rendering
// Page is rendered on the server at the time of each request.

// Always serves fresh data.

// In Next.js, you use getServerSideProps.