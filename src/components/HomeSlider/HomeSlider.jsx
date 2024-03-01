import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>


     
      <div className=" text-center ">
       <figure >
<img  className="w-100" src={require("../../images/bag.jpg")} alt="bag" />

       </figure>
      </div>
      <div>
       <figure>
        <img className="w-100" src={require("../../images/bb.jpg")} alt="baby stroller" />
       </figure>
      </div>
      
    </Slider>
  );
}