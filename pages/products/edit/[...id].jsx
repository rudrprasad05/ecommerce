import Layout from '@/components/layout'
import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const editProductPage = () => {
  const [productInfo, setProductInfo] = useState(null)
  
  const router = useRouter()
  let tempId;
  let id;

  
  
  
  useEffect(() => {
    tempId = localStorage.getItem('edit')
    id = router.query.id || tempId

    if(!tempId){
      localStorage.setItem("edit", id)
    }

    console.log(id)
    if(!id) return

    axios.get('/api/products?id='+id).then(response => {
      setProductInfo(response.data)
      
    })
    }, [])

  return (
    <Layout title={"Product"}>
       <p className='text-blue-500 text-2xl capitalize mb-8'>Edit Product</p>
      {productInfo && <ProductForm { ...productInfo }/>}
    </Layout>
  )
}

export default editProductPage