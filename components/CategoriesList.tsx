import Link from 'next/link'
import {categoriesData} from '../data'

export default function CategoriesList() {
  
  return (
    <div className='flex gap-2 text-sm flex-wrap'>
      {categoriesData && categoriesData.map((category, key) => (
        <Link key={key} className='px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer' href={`/categories/${category.name}`}>{category.name}</Link>
      ))}
    </div>
  )
}
