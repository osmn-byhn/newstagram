import React from 'react'

export default function SignInBtns() {
  return (
    <div>
      
      <h1 className='mt-8 text-center text-2xl font-bold'>Sign In with</h1>
      <div className='mt-4 p-4 flex flex-col items-center justify-center gap-4'>
        <button className='text-white bg-black p-4 rounded-full text-lg'>
            <span className='mr-5'>
                <i className="bi bi-github"></i>
            </span>
            Sign In With GitHub
        </button>

        <button className='text-black bg-slate-200 p-4 rounded-full text-lg'>
            <span className='mr-5'>
                <i className="bi bi-google"></i>
            </span>
            Sign In With Google
        </button>
      </div>
    </div>
  )
}
