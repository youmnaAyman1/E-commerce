import React, { useContext } from 'react';
import { cartContext } from '../../context/CartContext/CartContext';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



function Cart() {
  const { numberOfCartItems, totalCartPrice, allProducts,updateProduct,removeProduct ,clearCart} = useContext(cartContext);
  const navigate=useNavigate();
    console.log("all products",allProducts);
    // productCountUpdated
    async function productCountUpdated(id,updatedCount){
   const res=  await   updateProduct(id,updatedCount);
   if(res){
    toast.success("produced updated successfully",{position:"top-center"})
   }
   else{
    toast.error("error occured",{position:"top-center"})
   }
    }
    // remove product
   async function yourProductRemoved(id){
    const res=   await removeProduct(id);
    if(res){
        toast.success("produced removed",{position:"top-center"})
    }
    else{
        toast.error("error occured",{position:"top-center"})
       }
    }
    
    // clear 

    async function clearYourCart() {
      try {
        const success = await clearCart();
    
        if (success) {
          navigate('/home');
          toast.success("Cart cleared successfully", { position: "top-center" });
        } else {
          toast.error("Error clearing cart", { position: "top-center" });
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Error occurred while clearing cart", { position: "top-center" });
      }
    }
    


    return (
        <>
        <Helmet>
          <title> Cart </title>
        </Helmet>
          {allProducts?.length ? (
            <div className='container mt-4'>
              <div className='d-flex justify-content-between '>
              <div>
              <h2>Shop Cart</h2>
              <h5 >Total Cart price: {totalCartPrice} EGP</h5>
              <button onClick={clearYourCart} style={{ marginLeft: "auto" }} className='btn btn-dark text-end'>Clear Cart</button>
              </div>
              <Link to="/checkout">
              <button className=' btn btn-outline-success fs-4'> check out </button>
              </Link>
            
          
          
             
      
              </div>
              
              {allProducts.map((product, idx) => (
                <div key={idx} className="row align-items-center mb-1">
                  <div className="col-3">
                    <figure style={{ width: "200px" }}>
                      <img className='w-100' src={product.product.imageCover} alt={product.title} />
                    </figure>
                  </div>
                  <div className="col-7">
                    <h3>{product.product.title}</h3>
                    <h5>{product.price}</h5>
                    <button onClick={() => yourProductRemoved(product.product.id)} className='btn btn-success'>Remove</button>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <button onClick={() => productCountUpdated(product.product.id, product.count + 1)} style={{ width: "50px", height: "50px" }} className='btn btn-success me-3'>+</button>
                    <p>{product.count}</p>
                    <button onClick={() => productCountUpdated(product.product.id, product.count - 1)} disabled={product.count === 1} style={{ width: "50px", height: "50px" }} className='btn btn-success ms-3'>-</button>
                  </div>
                </div>
              ))}
            </div>
          ) :<p>Your cart is empty </p> }
           
          
        </>
      );
      
   
}

export default Cart;
