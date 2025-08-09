"use client";
import React from "react";

type UserFormProps = {
  form: { name: string; email: string; age: string };
  errors: { name?: string; email?: string; age?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function UserForm({ form, errors, onChange, onSubmit }: UserFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <label style={{ fontWeight: 600, fontSize: "1rem" }}>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          style={{
            padding: "0.6rem 0.8rem",
            fontSize: "1rem",
            borderRadius: 5,
            border: errors.name ? "1px solid red" : "1px solid #ccc",
            outlineColor: "#0070f3",
            width: "100%",
          }}
        />
        {errors.name && <p style={{ color: "red", marginTop: 4 }}>{errors.name}</p>}
      </div>

      <div>
        <label style={{ fontWeight: 600, fontSize: "1rem" }}>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          style={{
            padding: "0.6rem 0.8rem",
            fontSize: "1rem",
            borderRadius: 5,
            border: errors.email ? "1px solid red" : "1px solid #ccc",
            outlineColor: "#0070f3",
            width: "100%",
          }}
        />
        {errors.email && <p style={{ color: "red", marginTop: 4 }}>{errors.email}</p>}
      </div>

      <div>
        <label style={{ fontWeight: 600, fontSize: "1rem" }}>Age</label>
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={onChange}
          style={{
            padding: "0.6rem 0.8rem",
            fontSize: "1rem",
            borderRadius: 5,
            border: errors.age ? "1px solid red" : "1px solid #ccc",
            outlineColor: "#0070f3",
            width: "100%",
          }}
        />
        {errors.age && <p style={{ color: "red", marginTop: 4 }}>{errors.age}</p>}
      </div>

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "white",
          backgroundColor: "#0070f3",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Add User
      </button>
    </form>
  );
}
