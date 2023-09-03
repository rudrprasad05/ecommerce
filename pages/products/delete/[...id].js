import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct(){
    const router = useRouter()
    const id = router.query.id
    const [productInfo, setProductInfo] = useState([])
    const [imgName, setImgName] = useState("")

    useEffect(() => {
        if(!id) return

        axios.get('/api/products?id=' + id).then(res => {
            setProductInfo(res.data)
            const imgsrctemp = res.data.imgSrc
            const myArray = imgsrctemp.split("/").pop()
            const final = myArray.split(".")[0]
            console.log(final)
        })

        
        
    }, [id])
    
    function goBack(){
        router.push('/products')
    }

    async function deleteProduct(){
        localStorage.removeItem('products')
        goBack()
        await axios.delete('/api/products?id=' + id)
        
        // cloudinary.uploader.destroy()
        
    } 

    return(
        <Layout>
            <div className="mx-auto w-4/5 mt-24 text-center">
                <div className="mb-5">
                    Do you want to delete the product: <span className="text-blue-500 italic">{productInfo?.title}</span> 
                </div>
                <div className="flex gap-5 justify-center">
                    <button className="px-5 py-2 bg-red-400 text-white rounded-lg" onClick={deleteProduct}>Yes</button>
                    <button className="px-5 py-2 bg-green-400 text-white rounded-lg" onClick={goBack}>No</button>
                </div>
            </div>
            
        </Layout>
    )
}