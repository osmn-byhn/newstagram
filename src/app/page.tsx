import CategoriesList from "../../components/CategoriesList";
import { postData } from "../../data";
import 'bootstrap-icons/font/bootstrap-icons.css';
import  Post from "../../components/Post";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {postData && postData.length > 0 ? 
      postData.map((post, key) => (<Post key={post.id} id={post.id} author={post.author} authorEmail={'test@email.com'} date={post.datepublished} thumbnail={post.thumbnail} category={post.category} title={post.title} content={post.content}  links={post.links || []} />))
       : (
        <div className="py-4">No post to display</div>
      )}
    </>
  )
}
