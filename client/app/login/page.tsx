import React from 'react'
import Head from 'next/head'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div>
        <Head>
        <title>Sign in</title>
        {/* Use the correct CDN link for Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <div className="container mt-40">
        <h1 className="text-2xl font-bold text-center my-12">Login Next Blog</h1>
            <form className="flex flex-col gap-2">
                <input type="email" name="email" id="email" placeholder="jhondie@email.com" className="bordermt-2" />
                <input type="password" name="password" id="password" placeholder="Password" className="border mt-2" />
                <button type="submit" className="bg-slate-800 text-white px-4 py-2 mt-12 rounded-md">Login</button>
                <Link href="/sign-in"  className="bg-[rgba('0,0,0,0')] text-black px-4 py-2 mt-1 rounded-md text-center">Sign-in</Link>
            </form>
      </div>
    </div>
  )
}
