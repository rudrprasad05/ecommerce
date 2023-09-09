import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose'
import React from 'react'
import {Product} from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'
import { getServerSession } from 'next-auth'
import { authOptions, isAdminRequest } from './auth/[...nextauth]'

const handle = async(req, res) => {

    await mongooseConnect()
    // await isAdminRequest(req, res)


    if(req.method === 'GET'){
        if(req?.query?.id){
            res.json(await Product.findOne({_id: req.query.id}))
            
        }
        else{
            res.json(await Product.find())
        }
        
    }

    if(req.method === 'POST'){
        const {title, description, price, imgSrc, category, properties} = req.body
        const productDoc = await Product.create({
            title, description, price, imgSrc, category, properties
        })
        res.json(productDoc)
    }

    if(req.method === 'PUT'){
        const {title, description, price, imgSrc, _id, category, properties} = req.body
        
        const doc = await Product.updateOne(
            {_id}, 
            {title, description, price, imgSrc, category, properties}
        )
        res.json(doc)
    }

    if(req.method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id: req.query.id})
        }
    }
}

export default handle