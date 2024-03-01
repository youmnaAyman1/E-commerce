import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext/AuthContextProvider'
import { cartContext } from '../CartContext/CartContext';

export const wishListContext =createContext();
function WishListProvider({children}) {
    // authentication context
    const{token}=useContext(AuthContext);
  
   
    // create states to get the data of product 
    const [allproductswishlist, setAllProductswishlist] = useState([]);

    // logged user wishlist
   async function userWishList(){
    const booleanr= await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:{token:localStorage.getItem("tkn")}
    })
    .then((response)=>{
        
console.log("response.data",response.data.data);

      setAllProductswishlist(response.data.data);
      
        return true;
    })
    .catch((err)=>{
        console.log("error",err);
        return false;
    })
    return booleanr;
    }
    // calling the userWishList function onve there is a token -- user logged in -- in mounting phase
    // use token -- need to use the authcontext
    useEffect(()=>{
        userWishList()
    },[token])

    // add product to wishlist
  async  function addProductToWishlist(id){
    const res= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            "productId": id
        },
        {headers:{token:localStorage.getItem('tkn')}}
    ).then((res)=>{
        console.log("added",res.data);
        // setAllProductswishlist(res.data.data);
        userWishList();
        return res.data;

    })
    .catch((err)=>{
        console.log(err)

    })
    }

// remove product from wishlist

async  function removeProductFromWishlist({id}){
    console.log(id);
    return  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`  
       , {headers:{token:localStorage.getItem('tkn')}}
    ).then((res)=>{
        console.log( 'removes',res.data);
        userWishList();
      
        // setAllProductswishlist(res.data.data.data);
        // console.log("ooo");
        return res
        
    })
    .catch((err)=>{
        console.log(err);
        

    })
    }
    return <wishListContext.Provider value={{addProductToWishlist,removeProductFromWishlist,userWishList,allproductswishlist, setAllProductswishlist}}>
    
    {children}
    </wishListContext.Provider>
        
    
}

export default WishListProvider

