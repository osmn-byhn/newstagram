"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import axios from "axios";
import { categoriesData } from "../../data";
import Link from "next/link";
import Head from 'next/head';
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const addLink = (e) => {
    e.preventDefault();
    if (linkInput !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        links: links,
      };

      const response = await axios.post(`https://newstagram-backend.onrender.com/news/${token}`, postData);

      console.log("Post işlemi başarılı:", response.data);
      router.push('/dashboard');
    } catch (error) {
      console.error("Post işlemi hatası:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Post</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <h1 className="text-2xl font-bold my-12 text-center">Create Post</h1>
      <form className="flex flex-col gap-2 mt-50" onSubmit={handleSubmit}>
        <input type="text" name="title" id="title" placeholder="Title of Post" className="border" onChange={handleChange} value={formData.title} />
        <textarea name="content" id="content" placeholder="Content of post..." onChange={handleChange} value={formData.content}></textarea>
        <input type="text" name="image" id="image" placeholder="Add image link" onChange={handleChange} value={formData.image} />

        {links &&
          links.map((link, i) => (
            <div key={i} className="flex items-center gap-4">
              <i className="bi bi-link-45deg"></i>
              <Link href={link}>
                <a className="text-[#7563DF] font-bold max-w-full overflow-hidden text-ellipsis">
                  {link}
                </a>
              </Link>
              <i className="bi bi-trash cursor-pointer" onClick={() => deleteLink(i)}></i>
            </div>
          ))}

        <div className="flex gap-2">
          <input type="text" name="link" id="link" placeholder="Paste the link and click on Add" className="flex-1" onChange={(e) => setLinkInput(e.target.value)} value={linkInput} />
          <button onClick={addLink} className="bg-gray-200 p-3 font-bold rounded-lg gap-2 items-center">
            <i className="bi bi-plus"></i>Add
          </button>
        </div>

        <select className="p-3 rounded-md border appearance-none" name="category" onChange={handleChange} value={formData.category}>
          <option value="">Select a Category</option>
          {categoriesData &&
            categoriesData.map((category, key) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md">
          Create Post
        </button>
      </form>
    </>
  );
}
