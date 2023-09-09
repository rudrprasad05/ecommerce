import { Order } from "@/models/Order"

const { mongooseConnect } = require("@/lib/mongoose")
const { isAdminRequest } = require("./auth/[...nextauth]")

const handle = async(req, res) => {
    await mongooseConnect()
    // await isAdminRequest(req, res)


    if(req.method === 'GET'){
        // if(req.query?.id){
        //     res.json(await Order.findOne({_id: req.query.id}))
            
        // }
    
        res.json(await Order.find())
        

        if(req.method === 'DELETE'){
            if(req.query?.id){
                await Order.deleteOne({_id: req.query.id})
            }
        }
        
    }

}

export default handle
