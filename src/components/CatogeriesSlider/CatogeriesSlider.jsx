import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
function CatogerySlider() {
  const settings = {
    dots:true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: "linear"
  };
        
      


      function getCatogries(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      }



      const{data,isLoading}=useQuery("catogeriesSlider", getCatogries);
      if(isLoading){
        return  <div className='bg-white bg-opacity-50 vh-100 d-flex  justify-content-center align-items-center'>
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


      }
    return (
      <div className="slider-container">
        <div className='container-fluid- px-3'>
        

         
      <Slider {...settings}>
          

          
            {data.data.data.map((catogery,idx)=> <div  key={idx}  >
              <div className=' overflow-hidden   '>
              <img className='w-100' style={{height:"250px" ,objectFit:"cover"}}   src={catogery.image} alt={catogery.image} />
              <h4> {catogery.name} </h4>
              </div>

            </div>
            
            
            
            )}
          
         
        </Slider>
        </div>
        </div>
      
     
       
      );
    }





export default CatogerySlider
