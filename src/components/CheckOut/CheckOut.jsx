import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { cartContext } from '../../context/CartContext/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function CheckOut() {
  const navigate = useNavigate();
  const { cartId, setCartId } = useContext(cartContext);
  const [isloading, setIsloading] = useState(false);
  const [isloadingonline, setIsloadingonline] = useState(false);
  const validationSchema = yup.object({
    city: yup.string().required('City is required'),
    phone: yup.string().required('Phone is required'),
    details: yup.string().required('Details is required'),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      phone: '',
      details: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Prevent the default form submission
      setSubmitting(true);

      // Perform your actions here, like making the API call
      cashPayment(values);
    },
  });

  function cashPayment(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: { token: localStorage.getItem('tkn') },
        }
      )
      .then((response) => {
        // Handle success response
        console.log(response.data);
        setIsloading(true);
        if (response.data.status === 'success') {
          toast.success('Order completed ');
          setCartId();
          setTimeout(() => {
            navigate('/home');
          }, 1500);
        }
      })
      .catch((error) => {
        // Handle error response
        console.error('Error:', error.response.data);
      });
  }

  function onlinePayment(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: { token: localStorage.getItem('tkn') },
          params: {
            url: `${window.location.origin}/#`,
          },
        }
      )
      .then((response) => {
        // Handle success response
        console.log(response.data);
        setIsloadingonline(true);
        if (response.data.status === 'success') {
          window.open(response?.data?.session.url, '_self');
        }
      })
      .catch((error) => {
        // Handle error response
        console.error('Error:', error.response.data);
      });
  }

  return (
    <>
    <Helmet> checkout </Helmet>
      <div className='w-50 m-auto py-3'>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='City'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city && (
            <div className='text-danger'>{formik.errors.city}</div>
          )}

          <label htmlFor='phone'>Phone</label>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Phone'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className='text-danger'>{formik.errors.phone}</div>
          )}

          <label htmlFor='details'>Details</label>
          <textarea
            id='details'
            name='details'
            placeholder='Details'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
          {formik.touched.details && formik.errors.details && (
            <div className='text-danger'>{formik.errors.details}</div>
          )}

          <div className='d-flex justify-content-evenly'>
          <button type='submit' className='btn btn-primary mt-3'>
            {isloading ? (
              <ColorRing
                visible={true}
                height='30'
                width='30'
                ariaLabel='color-ring-loading'
                wrapperStyle={{}}
                wrapperClass='color-ring-wrapper'
                colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
              />
            ) : (
              'Submit'
            )}
          </button>
          <button  type='button' onClick={() => onlinePayment(formik.values)} className='btn btn-info mb-2 mt-3'>
            {isloadingonline ? (
              <ColorRing
                visible={true}
                height='30'
                width='30'
                ariaLabel='color-ring-loading'
                wrapperStyle={{}}
                wrapperClass='color-ring-wrapper'
                colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
              />
            ) : (
              ' Online Payment'
            )}
          </button>
          
          </div>
        </form>
        
      </div>
    </>
  );
}

export default CheckOut;
