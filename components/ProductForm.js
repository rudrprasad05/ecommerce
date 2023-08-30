import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "./layout"
import {HiOutlineCloudUpload} from 'react-icons/hi'

export default function ProductForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    imgSrc: existingImage,
    category: existingCategory,
}){
    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [imgSrc, setImgSrc] = useState(existingImage || "")
    const [goToProducts, setGoToProducts] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(existingCategory || "")
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
            
        })
    }, [])

    const uploadImage = async (e) => {
        
        const files = e.target?.files

        if(files?.length > 0){
            const data = new FormData();

            for(const file of files){
                data.append('file', file)
            }

            data.append('upload_preset', 'myuploads')
           
            const res = await fetch('https://api.cloudinary.com/v1_1/dlio3oanz/image/upload', {
                method: "POST",
                body: data,
            }).then(r => r.json())

            
            setImgSrc(res.secure_url)
            
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(disabledButton()){
            setError("all fields need to be filled")
            return
        }
        const data = {title, description, price, imgSrc, category}
        
        if(_id){
            await axios.put('/api/products', {...data, _id})
        }else{
            await axios.post('/api/products', data)
            
        }
        setGoToProducts(true)
    }

    const disabledButton = () => {
        if(!title || !description || !price || !imgSrc || !category){
            return true
        }
        else return false
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

                <input 
                    type="file" 
                    className=""
                    onChange={uploadImage}
                />
             
                {imgSrc ? 
                    <img src={imgSrc}></img> : 
                    <div>No img</div>
                }

                <select name="" id="" value={category} onChange={e => {setCategory(e.target.value); }}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>

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

                {error && <div>{error}</div>}
                <button className='button mr-auto'>Save</button>
            </form>
        </>
    )
}