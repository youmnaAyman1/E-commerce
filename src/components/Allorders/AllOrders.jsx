import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllOrders() {
 const[allOrders,SetAllOrders]=   useState(null);
    function getUserOrder(){
        const userId=localStorage.getItem('userID')
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((res)=>{
            console.log(res.data);
            SetAllOrders(res.data);
        })
        .catch((err )=>{
            console.log('error',err)
        })

    }
    useEffect(()=>{
        getUserOrder();
    },[])
    return <>
    <div className="container">
        <div className="row">
            {allOrders?.map((order,idx)=>
            <div key={idx} className="col-md-6">
            <div className="order">
                <h5>payment Method: {order.paymentMethodType} </h5>
                  <h5>Order price:{ order.totalOrderPrice} </h5>
                  <p>This order delivered to  {order.shippingAddress.city} on phone number:{order.shippingAddress.phone} with details:{order.shippingAddress.details}</p>
            </div>
        </div>)}
            
        </div>
    </div>
    </>
    
}

export default AllOrders
