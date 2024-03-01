import React from 'react';
import { ColorRing, ProgressBar } from 'react-loader-spinner';

function IsLoading({ isLoading }) {
 
    return (
      <div className='bg-white bg-opacity-50 vh-100 d-flex  justify-content-center align-items-center'>
      <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#000', '#000', '#000', '#000', '#000']}
  />cascascscasca
    </div>

    );
  

 
}

export default IsLoading;
