import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';

function Logout() {
  const navigate = useNavigate();
  const { Logout } = useContext(UserContext);
  Logout();
  navigate('/');
  return (
   <></>
  );
}

export default Logout;