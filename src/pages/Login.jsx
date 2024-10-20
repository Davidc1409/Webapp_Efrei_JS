import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return (
    <div className='container col-6'>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values) => {
                try {
                const response = await fetch('https://api-efrei-cv-js.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                
                if(!response.ok){
                    console.log(response.status);
                    return;
                }
                if (response.status === 200 || 201) {
                    const data = await response.json();
                    login(data);
                    navigate('/', { replace: true });
                }
                } catch (error) {
                console.log(error.message);
                }
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('Required'),
                password: Yup.string().required('Required')
            })}>
            {({ isSubmitting }) => (
                <Form>
                <div className="form-group">
                    <label htmlFor="email">email:</label>
                    <Field className="form-control" type="email" name="email" />
                    <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
                </div>
                <div className="form-group">
                    <label htmlFor="login">Password:</label>
                    <Field className="form-control" type="password" name="password" />
                    <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
                </div>
                <div>
                    <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </div>
                </Form>
            )}
        </Formik>
    </div>
  );
}

export default Login;