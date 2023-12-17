import Link from "next/link";
const isLogin = true; // veya false, duruma göre değiştirilebilir

export default function Navbar() {
  return (
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
          <Link
            href={"/dashboard"}
            className="font-bold bg-blue-500 p-4 hover:bg-blue-700 rounded-lg flex items-center mr-5 text-white"
          >
            Dashboard
          </Link>
          <Link
            href={"/create-post"}
            className="font-bold bg-blue-500 p-4 hover:bg-blue-700 rounded-lg flex items-center text-white"
          >
            New Post
          </Link>
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
  );
}
