import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function CVManagement() {

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        description: '',
        education: '',
        workExperience: '',
        visible: false
      }}

      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">Prénom:</label>
            <Field className="form-control" type="text" name="firstName" />
            <ErrorMessage style={{ color: 'red' }} name="firstName" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom:</label>
            <Field className="form-control" type="text" name="lastName" />
            <ErrorMessage style={{ color: 'red' }} name="lastName" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <Field as="textarea" className="form-control" name="description" />
            <ErrorMessage style={{ color: 'red' }} name="description" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="education">Formation:</label>
            <Field as="textarea" className="form-control" name="education" />
            <ErrorMessage style={{ color: 'red' }} name="education" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="workExperience">Expériences professionelles:</label>
            <Field as="textarea" className="form-control" name="workExperience" />
            <ErrorMessage style={{ color: 'red' }} name="workExperience" component="div" />
          </div>

          <div className="form-group">
            <label>
              <Field type="checkbox" name="visible" />
              Rendre mon CV visible
            </label>
          </div>

          <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
            Créer
          </button>
        </Form>
      )}
    </Formik>
  );
}
