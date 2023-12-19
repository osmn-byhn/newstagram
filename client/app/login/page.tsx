'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = {
        email,
        password,
      };

      const response = await axios.post('http://localhost:5000/login', user);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        router.push('/');
      }
    } catch (err) {
      setError(err.response?.data.error || 'An error occurred');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Sign in</title>
        {/* Use the correct CDN link for Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <div className="container mt-40">
        <h1 className="text-2xl font-bold text-center my-12">Login Next Blog</h1>
        <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <input
            type="email"
            name="email"
            className="border mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your e-mail address"
          />
          <input
            type="password"
            name="password"
            className="border mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
          />
          <button type="submit" className="bg-slate-800 text-white px-4 py-2 mt-12 rounded-md" disabled={password.length <= 8}>Login</button>
          <Link href="/sign-in" className="bg-[rgba('0,0,0,0')] text-black px-4 py-2 mt-1 rounded-md text-center">Sign-up</Link>
        </form>
      </div>
    </div>
  );
}
