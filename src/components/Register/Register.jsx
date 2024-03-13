import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required").min(3, "Name min length is 3"),
  phone: yup.string().required().matches(/^01[125][0-9]{8}$/, 'Invalid phone number'),
  email: yup.string().required().email(),
  password: yup.string().matches(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/).required("Password is required"),
  rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Re-Password is required'),
});

const userData = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
};

function Register() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/login');
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
  <title>Register </title>
</Helmet>
    <div className='w-50 m-auto mt-5'>
      {isSuccess ? <div className='alert alert-success text-center'>Congratulations! Your account has been created.</div> : ""}
      {isFailed ? <div className='alert alert-danger text-center'>{isFailed}</div> : ""}

      <h2>Register now</h2>

      <form onSubmit={myFormik.handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          placeholder='Name'
          className='form-control mb-2'
          id='name'
          name='name'
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.name}
        />
        {myFormik.touched.name && myFormik.errors.name && (
          <div className='text-danger'>{myFormik.errors.name}</div>
        )}

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

        <label htmlFor='rePassword'>Re-Password:</label>
        <input
          type='password'
          placeholder='Re-Password'
          className='form-control mb-2'
          id='rePassword'
          name='rePassword'
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.rePassword}
        />
        {myFormik.touched.rePassword && myFormik.errors.rePassword && (
          <div className='text-danger'>{myFormik.errors.rePassword}</div>
        )}

        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          placeholder='Phone'
          className='form-control mb-2'
          id='phone'
          name='phone'
          onChange={myFormik.handleChange}
          onBlur={myFormik.handleBlur}
          value={myFormik.values.phone}
        />
        {myFormik.touched.phone && myFormik.errors.phone && (
          <div className='text-danger'>{myFormik.errors.phone}</div>
        )}

        <button type='submit' className='btn bg-main border-0' disabled={isLoading}>
          {isLoading ? <ColorRing

visible={true}
height="30"
width="30"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
/>:  'Register now'}
        </button>
      </form>
    </div>
    </>
}

export default Register;
