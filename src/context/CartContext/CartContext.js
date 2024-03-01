import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContextProvider';

export const cartContext = createContext();

// Shared Axios instance
const apiInstance = axios.create({
  baseURL: 'https://ecommerce.routemisr.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [numOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  // for checking out --- cart id needed
  const [cartId,setCartId]=useState(null);

  async function getLoggedUserCart() {
    try {
      setLoading(true);
      const res = await apiInstance.get('cart', {
        headers: { token: localStorage.getItem('tkn') },
      });
      setAllProducts(res.data.data.products);
      setNumberOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartId(res.data.data._id); 
      localStorage.setItem('userID',res.data.data.cartOwner)
    } catch (error) {
      console.error('Error fetching user cart:', error);
    } finally {
      setLoading(false);
    }
  }

 async function clearCart() {
    return await apiInstance
      .delete('cart', { headers: { token: localStorage.getItem('tkn') } })
      .then((res) => {
        setAllProducts([]);
        setNumberOfCartItems(0);
        setTotalCartPrice(0);
        console.log('Cart cleared successfully');
        return true; // Resolve with true for success
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
        throw error; // Reject the promise with the error
      });
  }

  async function addProductToCart(id) {
    try {
      const res = await apiInstance.post('cart', { productId: id }, { headers: { token } });
      console.log('Product added successfully');
      getLoggedUserCart();
      return res.data;
    } catch (err) {
      console.error('Error adding product to cart', err);
      throw err;
    }
  }

  async function updateProduct(id, updatedCount) {
    try {
      const res = await apiInstance.put(`cart/${id}`, { count: updatedCount }, { headers: { token } });
      setAllProducts(res.data.data.products);
      setNumberOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      return true;
    } catch (err) {
      console.error('Error updating product count', err);
      return false;
    }
  }

  async function removeProduct(id) {
    try {
      const res = await apiInstance.delete(`cart/${id}`, { headers: { token } });
      setAllProducts(res.data.data.products);
      setNumberOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, [token]);

  return (
    <cartContext.Provider
      value={{ addProductToCart,
         numOfCartItems,
          totalCartPrice,
           allProducts, 
           updateProduct, 
           removeProduct, 
           clearCart,
            loading ,
            setCartId,
            cartId}}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
