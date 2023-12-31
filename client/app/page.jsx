"use client"; // Bu satır gereksiz, kaldırabilirsiniz.
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from "next/navigation";

import DeleteButton from '../components/DeleteButton';

export default function Home() {
  const [deger, setDeger] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://newstagram-backend.onrender.com/news/`);
        const fetchedData = response.data.news;
        console.log(fetchedData);
        
        setDeger(fetchedData);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <Head>
        <title>News Feed</title>
        {/* Bootstrap Icons için CDN linkini kullanın */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <div>
        {deger && deger.length > 0 ? (
          deger.map((post, key) => (
            <div className='my-20' key={key}>
              <div>
                {post && 'newsList' in post && post.newsList && post.newsList.length > 0 ? (
                  <ul>
                    {post.newsList.map((news, newsKey) => (
                      <li key={newsKey} className='my-20'>
                        <div className='mb-4'>Posted by: <span className="font-bold">{post.fullName}</span> on <span>{news.date}</span></div>
                        <div className='w-full h-72 relative'>
                          {
                            news.image ? (
                              <Image src={news.image} alt={news.title} fill className='object-cover rounded-md object-center'/>
                            ) : <Image src={'https://altinbilek.com.tr/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'} alt={'Not Thumbnail'} fill className='object-cover rounded-md object-center'/>
                          }
                        </div>
                        {news.category && (<Link href={`categories/${news.category}`} className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block">{news.category}</Link>)}
                        <h2 className='text-2xl font-bold my-4'>{news.title}</h2>
                        <p className='leading-loose '>{news.content}</p>
                        {news.links && (
                          <div className='my-4 flex flex-col gap-3'>
                            {news.links.map((link, i) => (
                              <div key={i} className='flex gap-2 item-center '>
                                <Link href={link} className='text-[#7563DF] font-bold max-w-full over-hidden text-ellipsis'><i className="bi bi-link-45deg"></i> {link}</Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center mt-12">No posts to show</div>
        )}
      </div>
    </>
  );
}