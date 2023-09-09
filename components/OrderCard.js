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
    <div className={'mb-5'}>
        <div className=''>
            <div>
                Order ID: {props._id}
            </div>
            <div>
                Name: {props.name}
            </div>
            <div>
                Delivery Address: {props.address}
            </div>
        </div>

        <div>
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
        </div>

       
    </div>
  )
}

export default OrderCard