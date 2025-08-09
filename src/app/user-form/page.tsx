"use client"; 
import React, { useState } from "react";
import Layout from '../components/Layout';
import UserForm from '../components/user-form';
import { gql, useMutation } from '@apollo/client';

type FormData = {
  name: string;
  email: string;
  age: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
      name
      email
      age
    }
  }
`;

export default function UserFormPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const [addUser, { loading, error }] = useMutation(ADD_USER);

  function validate() {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.age.trim()) newErrors.age = "Age is required";
    else if (isNaN(Number(form.age)) || Number(form.age) <= 0) newErrors.age = "Age must be a positive number";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { data } = await addUser({
          variables: {
            input: {
              name: form.name,
              email: form.email,
              age: Number(form.age),
            },
          },
        });
        alert(`User added successfully!`);
        setForm({ name: "", email: "", age: "" }); // Reset form
      } catch (err) {
        if (err instanceof Error) {
          alert("Error adding user: " + err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    }
  }

  return (
    <Layout>
      <UserForm
        form={form}
        errors={errors}
        onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        onSubmit={handleSubmit}
      />
      {loading && <p>Saving user...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </Layout>
  );
}
