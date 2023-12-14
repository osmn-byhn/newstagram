import Link from "next/link";

export default function Navbar () {
    return(
        <div className="flex justify-between mt-12 border-b pb-4">
            <div>
                <Link href={'/'} className="font-bold text-3xl">NextBlog</Link>
                <p>My First Next CRUD Project</p>
            </div> 
            <div className="inline-flex">
                <Link href={'/login'} className="font-bold bg-gray-200/70 p-4 hover:bg-gray-300 rounded-lg flex items-center mr-5">Login</Link>
                <Link href={'/sign-in'} className="font-bold bg-black p-4 hover:bg-gray-800 rounded-lg flex items-center text-white ">Sign-in</Link>
                
            </div>
        </div>
    )
}