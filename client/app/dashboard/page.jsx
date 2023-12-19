"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [deger, setDeger] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const token = localStorage.getItem("token");

        if (token === null) {
          router.push('/');
        } else {
          const response = await axios.get(`https://newstagram-backend.onrender.com/news/${token}`);
          const fetchedData = response.data.user.newsList;
          setDeger(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getItems();
  }, [router]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://newstagram-backend.onrender.com/news/${token}/${postId}`);
      console.log('Silme işlemi başarılı');
      window.location.reload();
    } catch (error) {
      console.error('Silme işlemi hatası:', error);
    }
  };

  return (
    <>
      <div>
        <h1 className='text-center text-2xl mt-12 font-bold'>My Posts</h1>
        {deger && deger.length > 0 ? (
          deger.map((post, key) => (
            <div className='my-14' key={key}>
              <div className='mb-4'>
                <ul>
                  <li key={key}>
                    <div className='w-full h-72 relative'>
                      {post.image ? (
                        <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" className='rounded-md object-center' />
                      ) : (
                        <Image src={'https://altinbilek.com.tr/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'} alt={'Not Thumbnail'} layout="fill" objectFit="cover" className='rounded-md object-center' />
                      )}
                    </div>
                    {post.category && (
                      <Link className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block" href={`/categories/${post.category}`}>
                        {post.category}
                      </Link>
                    )}
                    <h2 className='text-2xl font-bold my-4'>{post.title}</h2>
                    <p className='leading-loose'>{post.content}</p>
                    {post.links && (
                      <div className='my-4 flex flex-col gap-3'>
                        {post.links.map((link, i) => (
                          <div key={i} className='flex gap-2 item-center'>
                            <Link className='text-[#7563DF] font-bold max-w-full over-hidden text-ellipsis' href={link}>
                              <i className="bi bi-link-45deg"></i> {link}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
                <div className='flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit'>
                  <Link href={`/edit-post/${post._id}`}>
                    Edit
                  </Link>
                  <button className="text-red-600" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <span>No post created yet. </span>
            <Link className="underline font-bold" href={'/create-post'}>
             Create New Post
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
