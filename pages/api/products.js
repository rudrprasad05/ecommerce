import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose'
import React from 'react'
import {Product} from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'

const handle = async(req, res) => {

    await mongooseConnect()
    if(req.method == 'POST'){
        const {title, description, price} = req.body
        const productDoc = await Product.create({
            title, description, price
        })
        res.json(productDoc)
    }

    if(req.method == 'GET'){
        if(req.query?.id){
            res.json(await Product.findOne({_id: req.query.id}))
        }
        res.json(await Product.find())
    }
    
    if(req.method == 'PUT'){
        const {title, description, price, _id} = req.body
        await Product.updateOne({_id}, {title, description, price})
        res.json(true)
    }

    if(req.method == 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id: req.query.id})
        }
    }
}

export default handle