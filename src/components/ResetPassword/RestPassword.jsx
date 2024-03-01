import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function ResetPassword() {
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
      newPassword: yup.string().required('New password is required'),
    }),
    onSubmit: (values) => {
      resetYourPassword(values.email, values.newPassword);
    },
  });

  const navigate = useNavigate('/login');



  function resetYourPassword(email, newPassword) {
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email,
        newPassword: newPassword,
      })
      .then((res) => {
        // Handle success response
        console.log(res.data);
        navigate ('/login');
        
      })
      .catch((error) => {
        // Handle error response
        console.error(error.response.data);
      });
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className="text-danger">{formik.errors.newPassword}</div>
        )}

        <button onClick={()=>navigate} type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
