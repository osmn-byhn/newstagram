'use client';

import { useState } from "react"
import { categoriesData } from "../data"
import Link from "next/link";
export default function CreatePostForm() {
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("")

    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(linkInput !== ''){
            setLinks((prev) => [...prev, linkInput]);
            setLinkInput("");
        }
    }

    const deleteLink = (index:number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index));
    }
    return (
        <>
            <h1 className="text-2xl font-bold mt-3">Create Post</h1>
            <form className="flex flex-col gap-2">
                <input type="text" name="title" id="title" placeholder="Title of Post" className="border" />
                <textarea name="content" id="content" placeholder="Content of post..."></textarea>

                {links && links.map((link, i) => <div key={i} className="flex items-center gap-4"><i className="bi bi-link-45deg"></i><Link href={link} className="text-[#7563DF] font-bold max-w-full overflow-hidden text-ellipsis">{link}</Link><i className="bi bi-trash cursor-pointer" onClick={() => deleteLink(i)}></i></div>)}

                <div className="flex  gap-2">
                    <input type="text" name="link" id="link" placeholder="Paste the link and click on Add" className="flex-1" onChange={e => setLinkInput(e.target.value)} value={linkInput}/>
                    <button onClick={addLink} className="bg-gray-200 p-3 font-bold rounded-lg gap-2 items-center" ><i className="bi bi-plus"></i>Add</button>
                </div>

                <select className="p-3 rounded-md  border appearance-none">
                    <option value="">Select a Category</option>
                    {
                        categoriesData && categoriesData.map((category, key) => (
                            <option value="{category.name}" key={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md">Create Post</button>
                <div className="text-red-500 p-2 font-bold">Error Message</div>
            </form>
        </>
    )
}