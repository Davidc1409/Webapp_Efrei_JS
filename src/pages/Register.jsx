import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className='container col-6'>
      <Formik
        initialValues={{
          surname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={async (values) => {
          const postForm = await fetch('https://api-efrei-cv-js.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });
          const data = await postForm.json();
          console.log(data);
          navigate('/');
        }}
        validationSchema={Yup.object({
          surname: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 15 characters or less')
            .required('Required'),
          lastname: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
        })}>
        {({ isSubmitting }) => (
          <Form className=' d-flex flex-column gap-3'>
            <div className="form-group">
              <label htmlFor="name">Surname:</label>
              <Field className="form-control" type="surname" name="surname" />
              <ErrorMessage style={{ color: 'red' }} name="surname" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Lastname:</label>
              <Field className="form-control" type="lastname" name="lastname" />
              <ErrorMessage style={{ color: 'red' }} name="lastname" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field className="form-control" type="email" name="email" />
              <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field className="form-control" type="password" name="password" />
              <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field className="form-control" type="confirmPassword" name="confirmPassword" />
              <ErrorMessage style={{ color: 'red' }} name="confirmPassword" component="div" />
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