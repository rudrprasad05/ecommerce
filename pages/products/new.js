import Layout from '@/components/layout'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ProductForm from '@/components/ProductForm'

const newProduct = () => {
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [goToProducts, setGoToProducts] = useState(false)
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {title, description, price}
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }
  if(goToProducts){
    router.push('/products')
  }
  return (  
    <Layout>
       <p className='text-blue-500 text-2xl capitalize mb-8'>New Product</p>
      <ProductForm/>
    </Layout>
  )
}

export default newProduct