"use client";
import React, { useState } from "react";
import Layout from '../components/Layout'
import UserForm from '../components/user-form';

type FormData = {
  name: string;
  email: string;
  age: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function UserFormPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate() {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.age.trim()) newErrors.age = "Age is required";
    else if (isNaN(Number(form.age)) || Number(form.age) <= 0) newErrors.age = "Age must be a positive number";
    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // TODO: Call your API to save user data here

      alert("User added successfully!");
      setForm({ name: "", email: "", age: "" }); // Reset form
    }
  }

  return (
    <Layout>
      <UserForm form={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
    </Layout>
  );
}
