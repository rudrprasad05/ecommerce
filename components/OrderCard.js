import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'


const OrderCard = ({props}) => {

    const [productsLS, setProductsLS] = useState([])
   

    useEffect(() => {
      const ls = localStorage.getItem('products')
      setProductsLS(JSON.parse(ls))
      console.log(JSON.parse(ls))
        
    }, [])

  return (
    <div className={'shadow-sm grid grid-cols-10 py-2 text-center px-5'}>
       
        <div className='col-span-1 text-ellipsis overflow-clip'>{props._id}</div>
        <div className='col-span-2'>{props.name}</div>
        <div className='col-span-2'>{props.address}</div>
        <div className='col-span-2'>{moment(props.createdAt).format("Do MMM YY")}</div>
        <div className='col-span-1'>FJD {props.total}</div>
        <div className='col-span-1'>{props.paid ? <span className='text-green-500'>PAID</span> : <span className='text-red-500'>PENDING</span>}</div>
        <div className='col-span-1'>Status</div>
 

        {/* <div>
            {props.line_items.map(e => (
                productsLS.map(f => {
                   if (e == f._id){
                       return(
                           <div>
                               {f.title}: {f._id}
                               <div>{moment(props.createdAt).format("Do MMM YY")}</div>
                           </div>

                       )
                   }
                })
            ))}
        </div> */}

       
    </div>
  )
}

export default OrderCard