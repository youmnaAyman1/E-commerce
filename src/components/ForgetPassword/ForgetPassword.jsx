import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const navigateToCode = useNavigate('/forgetPassword');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          {
            email: values.email,
          }
        );

        console.log(response.data);

        if (response.data.statusMsg === 'success') {
          navigateToCode('/verifyResetCode');
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          console.error('Response Data:', error.response.data);
        }
      }
    },
  });

  return (
    <div className='container'>
      <h2>Please enter your email to receive a verification code</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          className='form-control mb-2'
          type='email'
          placeholder='Email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='text-danger'>{formik.errors.email}</div>
        )}
        <button onClick={()=>navigateToCode} type='submit' className='btn btn-outline-success'>
          Verify
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
