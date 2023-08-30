import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function handle(req, res){

    await mongooseConnect()

    if(req.method === "GET"){
        res.json(await Category.find().populate('parent'))
    }

    if(req.method === "POST"){
        const {name, parentCategory, properties} = req.body
 
        const catDoc = await Category.create({
            name, 
            parent: parentCategory || undefined, 
            properties,})
        res.json(catDoc)
    }

    if(req.method === "PUT"){
        const {name, parentCategory, _id, properties} = req.body
      
        const catDoc = await Category.updateOne({_id},{
            name, 
            parent: parentCategory, 
            properties,})
        res.json(catDoc)
    }

    if(req.method === 'DELETE'){
        const {_id} = req.query

        const catDoc = await Category.deleteOne({_id: _id})
        // console.log(_id)
       
        res.json(catDoc)
        
    }


}