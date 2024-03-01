import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyResetCode() {
    const formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        onSubmit: (values) => {
            verifyYourCode(values.resetCode);
        },
    });
    const navigate = useNavigate('/resetPassword');

    function verifyYourCode(resetCode) {
        axios
            .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
                resetCode: resetCode,
            })
            .then((res) => {
                // Handle success response
                console.log(res.data);
                if (res.data.status=== 'Success') {
                  navigate('/resetPassword');
                }
            })
            .catch((error) => {
                // Handle error response
                console.error(error.response.data);
            });
    }

    return (
        <div>
            <h1>Enter verification code</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter verification code'
                    id='resetCode'
                    name='resetCode'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.resetCode}
                    className='form-control'
                />
                <button onClick={()=>navigate} type='submit' className='btn btn-outline-success'>
                    Verify
                </button>
            </form>
        </div>
    );
}

export default VerifyResetCode;
