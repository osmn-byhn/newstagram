'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage kontrolü yap
    const storedData = localStorage.getItem('token'); // 'yourKey' kısmını kendi anahtarınızla değiştirin
    if (storedData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []); // Boş bağımlılık dizisi ile sadece bir kere çalışmasını sağlar

  function logout() {
    localStorage.clear();
    setIsLogin(false);
    console.log('Çıkış yapıldı');
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
        {/* Use the correct CDN link for Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <div className="flex justify-between mt-12 border-b pb-4">
        <div>
          <Link href={'/'} className="font-bold text-3xl">
            NextBlog
          </Link>
          <p>My First Next CRUD Project</p>
        </div>

        {isLogin ? (
          <div className="inline-flex">
            {/* Kullanıcı giriş yapmışsa */}
            <button
              className="btn btn-link bi bi-file-post text-blue-500 p-1 hover:text-blue-700 rounded-lg flex items-center mr-5 text-2xl"
              onClick={() => router.push('/dashboard')}
            ></button>
            <button
              className="btn btn-link bi bi-plus-circle text-green-500 p-1 hover:text-green-700 rounded-lg flex items-center mr-5 text-2xl"
              onClick={() => router.push('/create-post')}
            ></button>
            <button
              className="btn btn-link bi bi-box-arrow-right text-red-500 p-1 hover:text-red-700 rounded-lg flex items-center mr-5 text-2xl"
              onClick={logout}
            ></button>
          </div>
        ) : (
          <div className="inline-flex">
            {/* Kullanıcı giriş yapmamışsa */}
            <Link
              href={"/login"}
              className="font-bold bg-gray-200/70 p-4 hover:bg-gray-300 rounded-lg flex items-center mr-5"
            >
              Login
            </Link>
            <Link
              href={"/sign-in"}
              className="font-bold bg-black p-4 hover:bg-gray-800 rounded-lg flex items-center text-white"
            >
              Sign-in
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
