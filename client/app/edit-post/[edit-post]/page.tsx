"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { categoriesData } from "../../../data";
import Link from "next/link";
import Head from 'next/head';
import { useRouter } from "next/navigation";

export default function EditPostForm() {
  
  const router = useRouter();
  const postId = window.location.pathname.split('/').pop();
  if (typeof window !== "undefined") {
    // Tarayıcı tarafında çalışan kodlar buraya gelecek
    const token = localStorage.getItem("token");
    return token;
    // Diğer işlemler...
  }
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`https://newstagram-backend.onrender.com/news/${token}/${postId}`);
        const postData = response.data;
        console.log(response);
        
        setFormData({
          title: postData.newsItem.title,
          content: postData.newsItem.content,
          category: postData.newsItem.category,
          image: postData.newsItem.image,
          
        });

        setLinks(postData.newsItem.links || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [postId, token]);

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const putData = async () => {
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        links: links,
      };

      // Veriyi güncellemek için Axios kullanımı (PUT)
      await axios.put(`https://newstagram-backend.onrender.com/news/${token}/${postId}`, postData);

      console.log("Güncelleme işlemi başarılı");
      router.push('/dashboard'); // Güncelleme başarılı olduğunda yönlendirme
    } catch (error) {
      console.error("Güncelleme işlemi hatası:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await putData();
  };

  return (
    <>
      <Head>
        <title>Edit Post</title>
        {/* Bootstrap Icons için CDN linkini kullanın */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.17.0/font/bootstrap-icons.css" />
      </Head>
      <h1 className="text-2xl font-bold my-12 text-center">Edit Post</h1>
      <form className="flex flex-col gap-2 mt-50" onSubmit={handleSubmit}>
        {/* Diğer form alanları... */}
        <input type="text" name="title" id="title" placeholder="Title of Post" className="border" onChange={handleChange} value={formData.title} />
        <textarea name="content" id="content" placeholder="Content of post..." onChange={handleChange} value={formData.content}></textarea>

        {/* Resim yükleme alanı */}
        <input type="text" name="image" id="image" placeholder="Add image link" onChange={handleChange} value={formData.image} />

        {/* Links listesi */}
        {links &&
          links.map((link, i) => (
            <div key={i} className="flex items-center gap-4">
              <i className="bi bi-link-45deg"></i>
              <Link href={link} className="text-[#7563DF] font-bold max-w-full overflow-hidden text-ellipsis">
                {link}
              </Link>
              <i className="bi bi-trash cursor-pointer" onClick={() => deleteLink(i)}></i>
            </div>
          ))}

        {/* Link ekleme formu */}
        <div className="flex gap-2">
          <input type="text" name="link" id="link" placeholder="Paste the link and click on Add" className="flex-1" onChange={(e) => setLinkInput(e.target.value)} value={linkInput} />
          <button onClick={addLink} className="bg-gray-200 p-3 font-bold rounded-lg gap-2 items-center">
            <i className="bi bi-plus"></i>Add
          </button>
        </div>

        {/* Kategori seçimi */}
        <select className="p-3 rounded-md border appearance-none" name="category" onChange={handleChange} value={formData.category}>
          <option value="">Select a Category</option>
          {categoriesData &&
            categoriesData.map((category, key) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        {/* Submit butonu */}
        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md">
          Update Post
        </button>

        {/* Hata mesajı */}
        <div className="text-red-500 p-2 font-bold text-center">If the data hasnt loaded, please refresh the page with F5.</div>
      </form>
    </>
  );
}
