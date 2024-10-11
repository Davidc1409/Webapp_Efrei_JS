import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className='container col-6'>
        <Formik
        initialValues={{
            login: '',
            password: ''
        }}
        onSubmit={async (values) => {
            try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                data: values
            });

            if (response.status === 200) {
                console.log('Succesfully Login =>', response.json());
                navigate('/', { replace: true });
            }
            
            } catch (error) {
            console.log(error.message);
            }
        }}>
        {({ isSubmitting }) => (
            <Form className='d-flex flex-column gap-3'>
            <div className="form-group">
                <label htmlFor="login">Login:</label>
                <Field className="form-control" type="login" name="login" />
                <ErrorMessage style={{ color: 'red' }} name="login" component="div" />
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