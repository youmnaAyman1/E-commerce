import logo from './logo.svg';
import './App.css';
import { HashRouter, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import Home from './components/Home/Home';

import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';

import NotFound from './components/Not Found/NotFound';
import AuthcontextProvider from './context/AuthContext/AuthContextProvider';
import ProtectedRoute from './components/Protected Route/ProtectedRoute';
import Catogeries from './components/Catogeries/Catogeries';
import CartContextProvider from './context/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import WishListProvider from './context/WishList/WishList';
import WishList from './components/WishList/WishList';
import AllBrands from './components/AllBrands/AllBrands';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyResetCode from './components/VerficationCode/VerifyResetCode';
import RestPassword from './components/ResetPassword/RestPassword';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/Allorders/AllOrders';



 const myRouter= createHashRouter([
{path:'/',element:<Layout/> ,children:[
  {index:true , element:<Register/> },
{path:'register' , element:<Register/> },
{path:'login' , element:<Login/> },
{path: 'products', element: <ProtectedRoute>
<Products/>
</ProtectedRoute>  },
{path:'home' , element:
<ProtectedRoute>
<Home/>
</ProtectedRoute>},
{path:'Categories',element:<Catogeries/>},
{path:'*' , element:<NotFound/> },

{path: 'ProductDetails/:id',element:  <ProductDetails/>},

{path:'cart',element:<ProtectedRoute>
<Cart/>
</ProtectedRoute>
},
{path:'wish list',element:<ProtectedRoute>
<WishList/>
</ProtectedRoute>
},
{path:'brands',element:<ProtectedRoute>
<AllBrands/>
</ProtectedRoute>
},

{path:'checkout',element:<ProtectedRoute>
<CheckOut/>
</ProtectedRoute>
},
{path:'AllOrders',element:<ProtectedRoute>
<AllOrders/>
</ProtectedRoute>
},

]},
{path:'forgetPassword',element:<ForgetPassword/>},
{path:'verifyResetCode',element:<VerifyResetCode/>},
{path:'resetPassword',element:<RestPassword/>},




 ])


function App() {
  // handle asyn states 
  
  const myClient = new QueryClient();
  return <>
   <QueryClientProvider    client={myClient}>
      <AuthcontextProvider>
<CartContextProvider>
<WishListProvider>
<RouterProvider router={myRouter}/>
</WishListProvider>
</CartContextProvider>
</AuthcontextProvider>
    </QueryClientProvider>
     
<Toaster/>
  </>
   
   
  
    
   
    
  
}

export default App;
