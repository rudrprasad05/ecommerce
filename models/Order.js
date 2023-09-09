import mongoose, { model, Schema, models } from 'mongoose'

const OrderSchema = new Schema({
    line_items: {
        type: Object,
    },
    name: String,
    email: String,
    address: String,
    contact: String,
    paid: Boolean,
})

export const Order = models?.Order ||  model('Order', OrderSchema)