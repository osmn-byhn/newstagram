"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Post from "../../components/Post";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [deger, setDeger] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        if (localStorage.getItem('token') === null) {
          router.push('/');
        } else {
          const response = await axios.get(`http://localhost:5000/news/${localStorage.getItem('token')}`);
          const deger = response.data.user.newsList;
          setDeger(deger);
          console.log(deger);
          
        }
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getItems();
  }, []);

  return (



    <>
      <div>
      {deger && deger.length > 0 ? (
        deger.map((post, key) => (
          <div className='my-14' key={key}>
            <div className='mb-4'>
                <ul>
                    <li key={key}>
                      <div className='w-full h-72 relative'>
                        {
                          post.image ? (
                            <Image src={post.image} alt={post.title} fill className='object-cover rounded-md object-center'/>
                          ) : <Image src={'https://altinbilek.com.tr/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'} alt={'Not Thumbnail'} fill className='object-cover rounded-md object-center'/>
                        }
                      </div>
                      {post.category && (<Link href={`categories/${post.category}`} className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block">{post.category}</Link>)}
                      <h2 className='text-2xl font-bold my-4'>{post.title}</h2>
                      <p className='leading-loose '>{post.content}</p>
                      {post.links && (
                        <div className='my-4 flex flex-col gap-3'>
                          {post.links.map((link, i) => (
                            <div key={i} className='flex gap-2 item-center '>
                              <Link href={link} className='text-[#7563DF] font-bold max-w-full over-hidden text-ellipsis'><i className="bi bi-link-45deg"></i> {post.links}</Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                </ul>
              
            </div>
            <div className='flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit'>
                        <Link href={`/edit-post/$(id)`}>Edit</Link>
                        <button className="text-red-600 ">Delete</button>

                    </div>
          </div>
        ))
      ) : (
        <div>
          <span>No post created yet. </span>
          <Link href={'/create-post'} className="underline font-bold">
            Create New Post
          </Link>
        </div>
      )}
      </div>
    </>
  )
}
