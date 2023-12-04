import Link from "next/link";

export default function Navbar () {
    return(
        <div className="flex justify-between mt-12 border-b pb-4">
            <div>
                <Link href={'/'} className="font-bold text-3xl">NextBlog</Link>
                <p>My First Next CRUD Project</p>
            </div> 
            <div>
                <Link href={'/login'} className="font-bold bg-gray-200/70 p-4 hover:bg-gray-300 rounded-lg flex items-center ">Sign In</Link>
            </div>
        </div>
    )
}