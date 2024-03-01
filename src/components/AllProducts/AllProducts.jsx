import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import IsLoading from '../IsLoading/IsLoading';

function AllProducts() {
  const { isError, isFetching, isLoading, data } = useQuery(
    "getAllProducts",
    getAllProducts,
    {
      cacheTime: 1000,
      refetchInterval: 2000,
    }
  );

  const filterd= data?.data.data.filter((pro)=>{pro.title.includes('woman')})
  console.log("filterd",filterd);
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  if (isError) {
    return <Navigate  />
  }

  if (isLoading) {
    return <IsLoading />;
  }

  if (!data || data.length === 0) {
    return <div>No products found</div>;
  }
  
  return (
    <>
    <div className="mx-3">

    
          <div className='row'>
          {data?.data.data.map((product, idx) => (
            <div key={idx} className='col-md-2 mb-3'>
              <Link  className=' text-decoration-none' to={`/ProductDetails/${product.id}`}>
                <figure>
                  <img
                    src={product.imageCover}
                    className='w-100'
                    alt={product.title}
                  />
                  <h3>{product.category.name}</h3>
                  <h2>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                  {product.priceAfterDiscount ? (
                    <div className='d-flex justify-content-between'>
                      <p className='text-decoration-line-through'>
                        {product.price}
                      </p>
                      <p>{product.priceAfterDiscount}</p>
                    </div>
                  ) : (
                    <p>{product.price}</p>
                  )}
                  <p className='text-end'>
                    <i
                      style={{ color: 'yellow' }}
                      className='fa-solid fa-star'
                    ></i>{' '}
                    {product.ratingsAverage}
                  </p>
                </figure>
              </Link>
            </div>
          ))}
        </div>
        </div>
    </>
  );
}

export default AllProducts;
