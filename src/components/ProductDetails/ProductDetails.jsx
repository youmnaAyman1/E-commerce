import React, { useContext } from 'react';
import axios from 'axios';
import { ColorRing, ProgressBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { cartContext } from '../../context/CartContext/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../context/WishList/WishList';
import { Helmet } from 'react-helmet';


function ProductDetails() {
const {addProductToCart}=useContext(cartContext);
const {addProductToWishlist, removeProductFromWishlist,allproductswishlist }=useContext (wishListContext);
//  add product to cart button
 function addProduct(id) {
  const res= addProductToCart(id);
  if (res) {
    toast.success("It has been added successfully",{duration:1600,position:"top-center"});
  } else {
   toast.error("Errot occured",{duration:1600,position:"top-center"});
  }
}

// add product to wish list
 function wishListProducts(id){
 const res= addProductToWishlist(id);

 if (res) {
    toast.success("It has been added successfully",{duration:1600,position:"top-center"});
  } else {
   toast.error("Errot occured",{duration:1600,position:"top-center"});
  }
}


  const { id } = useParams();
  const { isError, isLoading, data } = useQuery(`ProductDetails-${id}`, getProductDetails);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
if(isError){
// must return jsx code thats why we use navigate 
  return <Navigate to='/products'  />
}
  if (isLoading) {
    return (
      <div className=' bg-opacity-50 vh-100 d-flex justify-content-center align-items-center'>
         <ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#000', '#000', '#000', '#000', '#000']}
  />
  </div>
    );
  }

  // Check if data is defined before accessing its properties
  const productDetails = data?.data.data;

  // Check if productDetails is undefined before rendering
  if (!productDetails) {
    return <div>Error loading product details</div>;
  }

  return (
    <>
    <Helmet> <title>{productDetails.title.split(' ').slice(0,2).join(' ') }</title> </Helmet>
      <div className="container mt-3">
        <div className="row align-items-center justify-content-center">
          <div className="col-3">
            <img className='w-100' src={productDetails.imageCover} alt={productDetails.imageCover} />
          </div>
          <div className="col-9">
            <article>
              <h1>{productDetails.title}</h1>
              <p>{productDetails.description}</p>
              <p>{productDetails.category.name}</p>
              <p>{productDetails.price} EGP </p>
              <div className="d-flex">
              <button onClick={()=>addProduct(productDetails.id)} className='w-100 bg-main text-white border-0 m-auto add'> +add to cart </button>
              {allproductswishlist.find((pro)=> pro.id  === productDetails.id  )?    <button className=' bg-transparent border-0 ' onClick={() => removeProductFromWishlist({id:productDetails.id})} >  
                
                <i  className='fa-solid fa-heart fa-2xl  text-danger '></i>
              </button> :  <button className='ms-3 bg-transparent border-0 ' onClick={() => wishListProducts(productDetails.id)} >  
                
        <i className='fa-solid fa-heart fa-2xl'></i>
      </button>}
              
              
             
              </div>
              
              
              
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
