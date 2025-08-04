"use client";
import { useState } from 'react';

export type User = {
  id: string;
  name: string;
};

export default function UsersClient({ users }: { users: User[] }) {
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
