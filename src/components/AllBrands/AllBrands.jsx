import axios from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query'


function AllBrands() {
    // useQuery
    //            uniquie key
const {data,isLoading}= useQuery("get all brands",getAllBrands)
      // state to track the selected brand 
const [selectedBrand,setSelectedBrand]=useState(null);

// get all brands 
 function getAllBrands(){
    // return --useQuery
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    
}

// is loading 
if (isLoading){
  
    return (
        <div className=' bg-opacit-75 vh-100 d-flex justify-content-center align-items-center bg-transparent'>
              <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#000', '#000', '#f8b26a', '#abbd81', '#849b87']}
        />
        </div>)
      
}
// Function to handle the click on a brand and set the selectedBrand state
const handleBrandClick = (brands) => {
    setSelectedBrand(brands);
  };



    return <>
    <Helmet>  <title> All brands </title> </Helmet>
    <div className="container text-center mb-4 ">
        <h1 className='  text-main m-4 '> All brands </h1>
        <div  className="row  g-4 ">
       {data?.data.data.map((brands,idx)=>(

            <div key={idx} className="col-md-3     " >
                <div className='border border-1 brands  ' data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => handleBrandClick(brands)}>
                <figure>
                <img style={{margin:"10px"}} src={brands.image} alt={brands.name} />
            </figure>
            <h3>{brands.name}</h3>
                </div>
            
            </div>

       ))
      

        
       }     
{/* modal */}

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header ">
        
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body d-flex justify-content-evenly align-items-center">
            <h3 className=' text-main'> {selectedBrand?.name}</h3>
         <figure>
          <img src={selectedBrand?.image} alt={selectedBrand?.name} />
         </figure>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>



            
            
        </div>
    </div>

  
    </>
        

}

export default AllBrands;
