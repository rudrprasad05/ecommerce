import Layout from '@/components/layout'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { HiOutlineCurrencyDollar, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import Skeleton from '@/components/Skeleton'


const products = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const loadingTemplate = [1, 2, 3, 4, 5];
  useEffect(() => {
    
    axios.get('/api/products').then(response => {
      setProducts(response.data)
      setLoading(false)
    })
    

  }, [])

  
  return (
    <Layout title={"Products"}>
        <div>
            <Link className='bg-blue-500 rounded-lg px-5 py-2 text-white shadow-md' href={"/products/new"}>Add Product</Link>
        </div>
        <div className='grid gap-5 py-5'>
          {products && products.map((item) => (
            <div key={item._id} className="overflow-clip h-32 pr-5 rounded-lg shadow-md flex items-center w-full">
              <div className='w-48 h-32n'>
                <img src={item.imgSrc} alt="" className='w-full h-full object-cover'/>
              </div>
              <div className='grow ml-10'>{item.title}</div>
              <div className='flex gap-2 items-center'>
                <span><HiOutlineCurrencyDollar/></span>
                <span>{item.price}</span> 
              </div>
              <div className='flex items-center pl-5 gap-2'>
                <Link href={'/products/delete/'+item._id}className='rounded-md p-2 bg-red-200'>
                  <HiOutlineTrash className='hover:stroke-red-500'/>
                  </Link>
                <Link href={"/products/edit/"+item._id} className='rounded-md p-2 bg-green-200'>
                  <HiOutlinePencil className='hover:stroke-green-500'/>
                </Link>
              </div>
            </div>)) 
              
          }

          {loading && (loadingTemplate.map((e, i) => (
              <Skeleton 
              key={i}
              additionalClasses={'gap-5 pr-5 h-32 w-full rounded-lg flex items-center'}
              img={true}
              imgClasses={"w-48 h-full"}
              text={true}
              textClasses={"h-4"}
            />
          ))
            
          )}
        </div>
        
    </Layout>
  )
}

export default products