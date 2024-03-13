import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext/AuthContextProvider';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

// Validation schema
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().matches(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/).required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setToken, userData } = useContext(AuthContext);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToForgetPassword = () => {
    navigate('/forgetPassword');
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      localStorage.setItem("tkn", res.data.token);
      setToken(res.data.token);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/home');
        // Display a toast with the user's name
        toast("Hello" , {
          icon: '🤗',
          position: "top-center",
          duration: 1600,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }, 3000);
    } catch (error) {
      setIsFailed(error.response.data.message);
      setTimeout(() => {
        setIsFailed(undefined);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='w-50 m-auto mt-5'>
        {isSuccess && <div className='alert alert-success text-center'>Welcome back.</div>}
        {isFailed && <div className='alert alert-danger text-center'>{isFailed}</div>}

        <h2>Login now</h2>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            placeholder='Email'
            className='form-control mb-2'
            id='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-danger'>{formik.errors.email}</div>
          )}

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            placeholder='Password'
            className='form-control mb-2'
            id='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='text-danger'>{formik.errors.password}</div>
          )}

          <button type='submit' className='btn  border-0 bg-main' disabled={isLoading}>
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
              />
            ) : 'Login'}
          </button>
        </form>

        <button onClick={navigateToForgetPassword} className='btn btn-link'>Forgot your password?</button>
      </div>
    </>
  );
};

export default Login;
