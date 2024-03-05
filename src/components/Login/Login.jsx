import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import {ColorRing  } from 'react-loader-spinner'
import { AuthContext } from '../../context/AuthContext/AuthContextProvider';
import { Helmet } from 'react-helmet';
import { Toast } from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast';


// Validation schema
const validationSchema = yup.object({
  
  email: yup.string().required().email(),
  password: yup.string().matches(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/).required("Password is required"),
  
});

const userData = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
};


function Login() {
  // use the authentication context 
  const navigateToForgetPassword = () => {
    navigate('/forgetPassword');
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken,userData } = useContext(AuthContext);


  async function onSubmit(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        localStorage.setItem("tkn",res.data.token);
        setToken(res.data.token);
        console.log(res.data.token)
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/home');
          toast('Hello '  + userData.name,
  {
    icon: '🤗',
    position:"top-center",
    duration:1600,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    
    },
  }
);

          
        }, 3000);
       
        setIsLoading(false);
      
      
      })
      .catch((error) => {
        setIsFailed(error.response.data.message);
        setTimeout(() => {
          setIsFailed(undefined);
        }, 3000);
        setIsLoading(false);
      });
  }

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });


  return <>
<Helmet> 
  <title> Login  </title>
</Helmet>
    <div className='w-50 m-auto mt-5'>
      {isSuccess ? <div className='alert alert-success text-center'>Welcome back.</div> : ""}
      {isFailed ? <div className='alert alert-danger text-center'>{isFailed}</div> : ""}

      <h2>Login now</h2>

      <form onSubmit={myFormik.handleSubmit}>
        
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          placeholder='Email'
          className='form-control mb-2'
          id='email'
          name='email'
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.email}
        />
        {myFormik.touched.email && myFormik.errors.email && (
          <div className='text-danger'>{myFormik.errors.email}</div>
        )}

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          placeholder='Password'
          className='form-control mb-2'
          id='password'
          name='password'
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.password}
        />
        {myFormik.touched.password && myFormik.errors.password && (
          <div className='text-danger'>{myFormik.errors.password}</div>
        )}

        <button type='submit' className='btn  border-0 bg-main' disabled={isLoading}>
          {isLoading ? <ColorRing

visible={true}
height="30"
width="30"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
/>: 'Login'}
        </button>
      </form>
     
      
      <button onClick={navigateToForgetPassword} className='btn btn-link'>Forgot your password?</button>
    </div>
    </>



}

export default Login;
