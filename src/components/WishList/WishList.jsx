import React, { useContext, useEffect, useState } from 'react';
import { wishListContext } from '../../context/WishList/WishList';
import toast from 'react-hot-toast';
import { cartContext } from '../../context/CartContext/CartContext';
import IsLoading from '../IsLoading/IsLoading';

function WishList() {
  const { allproductswishlist, removeProductFromWishlist } = useContext(wishListContext);
  const [loading, setLoading] = useState(true);
  const {addProductToCart}=useContext(cartContext);

  // useEffect(() => {
  //   if (allproductswishlist) {
  //     setLoading(false);
  //   }
  // }, [allproductswishlist]);


function addHandler({id}){
  addProduct(id)
  removeProductFromWishlist({id})
}

console.log(allproductswishlist);
async function yourProductRemoved({id}) {
  try {
    const res = await removeProductFromWishlist({id});
console.log("res",res);
    if (res.data.status === 'success') {
      toast.success("succ" ,{ position: "top-center" });
    } else {
      toast.error("Error occurred while removing the product", { position: "top-center" });
    }
  } catch (err) {
    console.error(err);
    toast.error("Error occurred while removing the product", { position: "top-center" });
  }
}


  //  add product to cart button
 function addProduct(id) {
  const res= addProductToCart(id);
  if (res) {
    toast.success("It has been added successfully",{duration:1600,position:"top-center"});

  } else {
   toast.error("Errot occured ",{duration:1600,position:"top-center"});
  }
}

  return (
    <div className='container bg-light my-3'>
      <h2>My Wish List</h2>
      {allproductswishlist?.map((product, idx) => (
        <div key={idx} className='row'>
          <div className='col-2'>
            <figure>
              <img className='w-100' src={product.imageCover} alt={product.title} />
            </figure>
          </div>
          <div className='col-8'>
            <div>
              <h3>{product.title}</h3>
              <h4>{product.price} EGP </h4>
              <button
                className='btn text-danger'
                onClick={() => yourProductRemoved({id:product.id})}
              >
                <i style={{ color: 'red' }} className='fa-solid fa-trash'></i> Remove
              </button>
            </div>
          </div>
          <div className='col-2'>
            <button onClick={()=>addHandler({id:product.id})} className='btn btn-outline-success'>Add to Cart</button>
          </div>
        </div>
      ))}
      {/* {loading &&<IsLoading/>}
      {!loading && allproductswishlist?.length === 0 && <p>Your wishlist is empty.</p>} */}
    </div>
  );
}

export default WishList;
