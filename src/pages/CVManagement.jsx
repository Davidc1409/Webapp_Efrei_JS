import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function CVManagement() {
  const [cvCreated, setCvCreated] = useState(false);
  const [cvData, setCvData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    education: '',
    workExperience: '',
    visible: false
  });

  return (
    <div className='container col-8'>
      {!cvCreated ? (
      <Formik
        initialValues={cvData}

        onSubmit={async (values) => {
          setCvData(values);
          setCvCreated(true);
          setVisible(values.visible);
        }}

        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
        })}
      >
        {({ isSubmitting }) => (
          <Form className='d-flex flex-column gap-3'>
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
              <label htmlFor="education">Formations:</label>
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
            <div>
              <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                Créer
              </button>
            </div>
          </Form>
        )}
      </Formik>
    ) : (

        <div>
          <h2>Mon CV</h2>
          <p><strong>Prénom:</strong> {cvData.firstName}</p>
          <p><strong>Nom:</strong> {cvData.lastName}</p>
          <p><strong>Description:</strong> {cvData.description}</p>
          <p><strong>Formations:</strong> {cvData.education}</p>
          <p><strong>Expériences professionnelles:</strong> {cvData.workExperience}</p>
          <p><strong>CV Visible:</strong> {cvData.visible ? "Oui" : "Non"}</p>
          
          <button className="btn btn-primary mt-3" onClick={() => setCvCreated(false)}>
            Modifier le CV
          </button>
        </div>
      )}
    </div>
  );
}
