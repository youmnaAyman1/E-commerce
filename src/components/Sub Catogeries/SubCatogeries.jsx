// SubCatogeries.jsx
import axios from 'axios';
import React from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';

function SubCatogeries({ categoryId }) {
  const { isLoading, data } = useQuery(['subCatogeries', categoryId], () => getSubCatogeries(categoryId));

  async function getSubCatogeries(categoryId) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/SubCategories/${categoryId}`);
  }
  return (
    <>
    
      {isLoading ? (
        <div className='bg-primary bg-opacity-50 vh-100 d-flex justify-content-center align-items-center'>
          <ProgressBar visible={true} height='100' width='100' color='#3A645A' ariaLabel='progress-bar-loading' />
        </div>
      ) : (
        <div className="container w-75 mt-5">
          <div className="row text-center">
            {data?.data.data.map((subCategory, idx) => (
              <div key={idx} className="col-md-4">
                <h2>{subCategory.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SubCatogeries;
