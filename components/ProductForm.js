import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "./layout"

export default function ProductForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice
}){
    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {title, description, price}
        if(_id){
            await axios.put('/api/products', {...data, _id})
        }else{
            await axios.post('/api/products', data)
            
        }
        setGoToProducts(true)
    }
    
    if(goToProducts){
        router.push('/products')
    }
    return (  
        <>
           
            <form className='grid gap-5' onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Product name'
                value={title}
                onChange={e => setTitle(e.target.value)}
                />

                <textarea 
                type="text" 
                placeholder='Descirptoin'
                value={description}
                onChange={e => setDescription(e.target.value)}
                ></textarea>

                <input 
                type="number" 
                placeholder='Price'
                value={price}
                onChange={e => setPrice(e.target.value)}
                />
                <button className='button mr-auto'>Save</button>
            </form>
        </>
    )
}