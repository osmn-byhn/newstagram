import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import DeleteButton from './DeleteButton';

interface PostProps {
    id: string,
    author: string,
    date: string,
    thumbnail?: string,
    authorEmail?: string,
    title: string,
    content: string,
    links?: string[],
    category?: string;
}

const isEditable = true;

export default function Post({id, author, authorEmail, date, thumbnail, category, title, content, links}: PostProps) {
    return (
        <div className='my-14'>
            <div className='mb-4'>Posted by: <span className="font-bold">{author}</span> on <span>{date}</span></div>

            <div className='w-full h-72 relative'>
                {
                    thumbnail ? (
                        <Image src={thumbnail} alt={title} fill className='object-cover rounded-md object-center'/>
                    ) : <Image src={'https://altinbilek.com.tr/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg'} alt={'Not Thumbnail'} fill className='object-cover rounded-md object-center'/>
                }
            </div>

            {category && (<Link href={`categories/${category}`} className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block">{category}</Link>)}

            <h2 className='text-2xl font-bold my-4'>{title}</h2>
            <p className='leading-loose '>{content}</p>
            {links && (
                <div className='my-4 flex flex-col gap-3'>
                    {links.map((link, i) => (
                        <div key={i} className='flex gap-2 item-center '>
                            <Link href={link} className='text-[#7563DF] font-bold max-w-full over-hidden text-ellipsis'><i className="bi bi-link-45deg"></i> {link}</Link>
                        </div>
                    ))}
                </div>
            )}

            {
                isEditable && (
                    <div className='flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit'>
                        <Link href={`/edit-post/$(id)`}>Edit</Link>
                        <DeleteButton />
                    </div>
                )
            }
        </div>

        
    )
}