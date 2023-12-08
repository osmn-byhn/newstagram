import React from 'react'
import Head from 'next/head'
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignInBtns from '../../../components/SignInBtns'

export default function SignIn() {
  return (
    <div>
        <Head>
        <title>Sign in</title>
        {/* Use the correct CDN link for Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
        <SignInBtns />
    </div>
  )
}
