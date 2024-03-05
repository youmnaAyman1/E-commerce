import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Catogeries() {
  // id of selected category
  const [categoryId, setCategoryId] = useState(null);

  // all categories
  const { data: catogeriesData, isLoading } = useQuery("allCatogeries", allCatogeries);
  // sub categories
  const { data: subCatogeriesData, isLoading:loading } = useQuery("subCategories", () => subCatogeries(categoryId)
  );

  // get all categories
  function allCatogeries() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  // get sub categories
  function subCatogeries(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
  }

  return (
    <>
    <Helmet> <title> Catogeries </title> </Helmet>
      <div className="container py-5 my-4 text-center">
        <h1 className='text-main text-center'>Categories</h1>
        <div className="row g-5">
          {catogeriesData?.data?.data.map((categories, idx) => (
            <div key={idx} className="col-md-4">
              <div onClick={() => setCategoryId(categories._id)} className="border border-1 rounded-3 overflow-hidden catogeriescontent">
                <figure>
                  <img style={{ height: "300px", objectFit: "cover" }} className='w-100 ' src={categories.image} alt={categories.name} />
                </figure>
                <h2 className='text-main'> {categories.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* sub categories */}
      {categoryId && (
        <div className='container'>
          
     
          <div className="row g-5">
         
            {subCatogeriesData?.data?.data.map((subCatogeries,idx) => (
             
             <div key={idx} className="col-md-4">
             
               <div className='border border-1'>
                 <p className='w-100'>{subCatogeries.name} </p>
               </div>
             </div>
                
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Catogeries;
