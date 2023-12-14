import { postData } from "../../data";
import 'bootstrap-icons/font/bootstrap-icons.css';
import  Post from "../../components/Post";
import Link from "next/link";
export default function Dashboard () {
    return (
        <div>
            <h1 className="text-2xl font-bold mt-6 text-center">My Posts</h1>
            {postData && postData.length > 0 ? 
            postData.map((post, key) => (<Post key={post.id} id={post.id} author={post.author} authorEmail={'test@email.com'} date={post.datepublished} thumbnail={post.thumbnail} category={post.category} title={post.title} content={post.content}  links={post.links || []} />))
            : (
                <div><span>No post created yet.    </span>
                <Link href={'/create-post'} className="underline font-bold">Create New Post</Link></div>
            )}
        </div>
    )
} 