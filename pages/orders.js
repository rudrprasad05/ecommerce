import Layout from '@/components/layout'
import OrderCard from '@/components/OrderCard'
import axios from 'axios'

import React, { useEffect, useState } from 'react'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [domLoaded, setdomLoaded] = useState(false)

    useEffect(() => {
        const getOrders = async() => {
            const res = await axios.get('/api/orders')
            const resBody = res.data
            setOrders(resBody)
            console.log(resBody)
            console.log("orders NOT from ls")
            localStorage.setItem('orders', JSON.stringify(resBody))
        }

        if(!localStorage.getItem('orders')){
            getOrders()
        }
        else{
            console.log("orders from ls")
            const res = localStorage.getItem('orders')
            setOrders(JSON.parse(res))

        }

        setdomLoaded(true)
    }, [])
  return (
    <Layout title={"Orders"}>
        <div className='bg-gray-200 rouned-mb shadow-sm grid grid-cols-10 py-2 text-center'>
            <div className='col-span-1'>ID</div>
            <div className='col-span-2'>Name</div>
            <div className='col-span-2'>Address</div>
            <div className='col-span-2'>Date</div>
            <div className='col-span-1'>Price</div>
            <div className='col-span-1'>Payment</div>
            <div className='col-span-1'>Status</div>
        </div>
        {domLoaded && orders && (
            orders.map((order) => (
                <OrderCard key={order._id} props={order}/>
            ))
        )}
    </Layout>
  )
}

export default Orders