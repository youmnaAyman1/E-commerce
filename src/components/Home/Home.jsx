import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import Products from '../Products/Products'
import CatogeriesSlider from '../CatogeriesSlider/CatogeriesSlider';
import { useContext } from 'react';
// import { cartContext } from '../Context/CartContext/CartContext';


function Home() {
    // const {addProductToCart}=useContext(cartContext);
    return <>

    <div className='container m-auto w-50 my-5' >
            <div className="row align-item-center">
                {/* home slider */}
                <div className="col-md-6 ">
                    <HomeSlider/>
                </div>
                <div className="col-md-6">
                        <div>
                            <figure>
                                <img className='w-100 m' src={require("../../images/bags.jpg")} alt="bags" />
                                <img className='w-100' src={require("../../images/guiter.jpg")} alt="guiter" />
                            </figure>
                        </div>
                </div>
            </div>

    </div>
   
      <CatogeriesSlider/>
    
    <div className='container' >
                        <Products/>

                        </div>
    </>
        
    
}

export default Home
