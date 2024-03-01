import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ColorRing, ProgressBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../context/WishList/WishList';
function Products() {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist, wishlist, setWishlist,allproductswishlist,removeProductFromWishlist } = useContext(wishListContext);
  const [searchTerm,setSearchTerm]=useState('');
  // State for managing button color
  const [isPressed, setIsPressed] = useState(false);
  

  // add product to wish list
 function wishListProducts(id){
  const res= addProductToWishlist(id);
 
  if (res) {
     toast.success("It has been added successfully",{duration:1600,position:"top-center"});
   } else {
    toast.error("Errot occured",{duration:1600,position:"top-center"});
   }
 }
  function addProduct(id) {
    const res = addProductToCart(id);
    if (res) {
      toast.success('Product added successfully', {
        duration: 1600,
        position: 'top-center',
      });
    } else {
      toast.error('Error occurred', { position: 'top-center', duration: 1600 });
    }
    console.log(res);
  }

  const { isLoading, data } = useQuery(
    'getAllProducts',
    getAllProducts,
    {
      cacheTime: 1000,
      refetchInterval: 2000,
    }
  );
  const filterd= data?.data.data.filter((pro)=>pro.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
console.log(searchTerm);
  console.log("filterd",filterd);

  function getAllProducts() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
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



  return (
    <>
      <div className='container '>
        <label htmlFor="search"></label>
        <input className='form-control mb-5' onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm}   placeholder='search' type='text'  id='search' />
        <div className=' products row   g-5  '>
          {filterd.map((product, idx) => (
       
            <div key={idx} className='col-md-3 position-relative '>
                    <div className=' product bg-light '>
                   
                <Link className=' text-decoration-none  ' to={`/ProductDetails/${product.id}`}>
                  <figure>
                    <img src={product.imageCover} className='w-100 ' alt={product.title} />
                    <h3>{product.category.name}</h3>
                    <h2>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                    {product.priceAfterDiscount ? (
                      <div className='d-flex justify-content-between'>
                        <p className='text-decoration-line-through'>{product.price}</p>
                        <p>{product.priceAfterDiscount}</p>
                      </div>
                    ) : (
                      <p>{product.price}</p>
                    )}
                    <p className='text-end'>
                      <i style={{ color: 'yellow' }} className='fa-solid fa-star'></i> {product.ratingsAverage}
                    </p>
                  </figure>
                </Link>
                <div className='position-absolute top-0 end-0 translate-middle-x m-3'>

                {allproductswishlist.find((pro)=> pro.id ===product.id )?<button className=' bg-transparent border-0 ' onClick={() => removeProductFromWishlist({id:product.id})} >  
                
                <i  className='fa-solid fa-heart fa-2xl  text-danger '></i>
              </button> :  <button className='ms-3 bg-transparent border-0 ' onClick={() => wishListProducts(product.id)} >  
                
        <i className='fa-solid fa-heart fa-2xl'></i>
      </button>}
                </div>
               
                  <button onClick={() => addProduct(product.id)} className='btn bg-main m-auto d-block flex-grow-1'>
                    + Add to Cart
                  </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
