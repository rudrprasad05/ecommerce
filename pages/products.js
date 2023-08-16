import Layout from '@/components/layout'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { HiOutlineCurrencyDollar, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

const products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    })
  }, [])
  
  return (
    <Layout>
        <div>
            <Link className='bg-blue-500 rounded-lg px-5 py-2 text-white shadow-md' href={"/products/new"}>Add Product</Link>
        </div>
        <div className='grid gap-5 py-5'>
          {products && products.map((item) => (
            <div key={item._id} className="px-5 py-2 rounded-lg shadow-md flex items-center">
              <div className='grow'>{item.title}</div>
              <div className='flex gap-2 items-center'>
                <span><HiOutlineCurrencyDollar/></span>
                <span>{item.price}</span> 
              </div>
              <div className='flex items-center pl-5 gap-2'>
                <Link href={'/products/delete/'+item._id}className='rounded-md p-2 bg-red-200'><HiOutlineTrash /></Link>
                <Link href={"/products/edit/"+item._id} className='rounded-md p-2 bg-green-200'><HiOutlinePencil /></Link>
              </div>
            </div>))}
        </div>
        
    </Layout>
  )
}

export default products