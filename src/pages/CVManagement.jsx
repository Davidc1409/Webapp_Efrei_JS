import React, { useState,useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default function CVManagement({}) {
  const userInfo= localStorage.getItem('user');
  const navigate = useNavigate();
  let token
  if(userInfo){
    const info = JSON.parse(userInfo);
    token = info.token;
  }
  const [cvCreated, setCvCreated] = useState(false);
  const [cvData, setCvData] = useState({
    id: '',
    surname: '',
    lastname: '',
    description: '',
    experiencesPedagogiques: '',
    experiencesProfessionnelles: '',
    visibility: false
  });
  
  useEffect(() => {
    const fetchCv = async () => {
      const response = await fetch(`https://api-efrei-cv-js.onrender.com/api/user/cv`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
      const data = await response.json()
      const cv = data[0];
      if(!cv){
        return;
      }
      
      setCvCreated(true);
      setCvData({
        id : cv._id,
        surname: cv.author.surname,
        lastname: cv.author.lastname,
        description: cv.description,
        experiencesPedagogiques: cv.experiencesPedagogiques,
        experiencesProfessionnelles: cv.experiencesProfessionnelles,
        visibility: cv.visibility
      })
    }
    fetchCv();
  }, []);

  

  return (
    <div className='container col-8'>
      {!cvCreated ? (
      <Formik
        initialValues={cvData}

        onSubmit={async (values) => {
          console
          if(!cvCreated){
            const id = values.id;
            const postForm = await fetch(`https://api-efrei-cv-js.onrender.com/api/cv/${id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
              body: JSON.stringify(values)
            });
            const data = await postForm.json();
            console.log(data);
          }
          else{
            console.log(values)
            const postForm = await fetch(`https://api-efrei-cv-js.onrender.com/api/cv/`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
              body: JSON.stringify(values)
            });
            const data = await postForm.json();
          }
          
        }}

        validationSchema={Yup.object({
          description: Yup.string().required('Required'),
          experiencesPedagogiques: Yup.string().required('Required'),
          experiencesProfessionnelles: Yup.string().required('Required'),
          visibility: Yup.boolean().required('Required'),
        })}
      >
        {({ isSubmitting }) => (
          <Form className='d-flex flex-column gap-3'>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <Field as="textarea" className="form-control" name="description" />
              <ErrorMessage style={{ color: 'red' }} name="description" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="education">Formations:</label>
              <Field as="textarea" className="form-control" name="experiencesPedagogiques" />
              <ErrorMessage style={{ color: 'red' }} name="experiencesPedagogiques" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="workExperience">Expériences professionelles:</label>
              <Field as="textarea" className="form-control" name="experiencesProfessionnelles" />
              <ErrorMessage style={{ color: 'red' }} name="experiencesProfessionnelles" component="div" />
            </div>

            <div className="form-group">
              <label>
                <Field type="checkbox" name="visibility" />
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
          <p><strong>Prénom:</strong> {cvData.surname}</p>
          <p><strong>Nom:</strong> {cvData.lastname}</p>
          <p><strong>Description:</strong> {cvData.description}</p>
          <p><strong>Formations:</strong> {cvData.experiencesPedagogiques}</p>
          <p><strong>Expériences professionnelles:</strong> {cvData.experiencesProfessionnelles}</p>
          <p><strong>CV Visible:</strong> {cvData.visibility ? "Oui" : "Non"}</p>
          
          <button className="btn btn-primary mt-3" onClick={() => {
            navigate(`/cvmanagement/?id=${cvData.id}`)
            setCvCreated(false)}}>
            Modifier le CV
          </button>
        </div>
      )}
    </div>
  );
}