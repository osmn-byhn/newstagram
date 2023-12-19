'use client';

import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  const validRegexPassword = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

  const signup = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const user = {
        fullName,
        email,
        password,
      };
      if (validRegexEmail.test(email)) {
        if (validRegexPassword.test(password)) {
          await axios.post('https://newstagram-backend.onrender.com/signup', user);
          setTimeout(() => {
            router.push('/');
          }, 7500);
        } else {
          setError('Invalid password');
        }
      } else {
        setError('Invalid email');
      }
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      router.push('/home');
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
        <h1 className="text-2xl font-bold text-center my-12">Sign-in Next Blog</h1>
        <form className="flex flex-col gap-2">
          <input
            type="text"
            required
            value={fullName}
            id="fullName"
            className="border mt-2"
            placeholder="e.g. John Die"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            required
            value={email}
            id="email"
            className="border mt-2"
            placeholder="e.g. johndie@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            id="password"
            value={password}
            className="border mt-2"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            id="signup"
            onClick={signup}
            disabled={password.length <= 8}
            type="submit"
            className="bg-slate-800 text-white px-4 py-2 mt-12 rounded-md"
          >
            Sign-in
          </button>
          <Link href="/login" className="bg-[rgba('0,0,0,0')] text-black px-4 py-2 mt-1 rounded-md text-center">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
