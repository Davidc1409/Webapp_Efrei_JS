import React from 'react';
import Cardcv from './Cardcv';
import { useState, useEffect } from 'react';
import Searchcv from './Searchcv';


export default function Cvstore() {
    const [cvs, setCvs] = useState([]); 
    const [criteria, setCriteria] = useState('');
    const [filteredCvs, setfilteredCvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api-efrei-cv-js.onrender.com/api/cv/');
      const data = await response.json();
      console.log(data);
      setCvs(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setfilteredCvs(cvs.filter((cv) => {
      if(cv.author.surname.toLowerCase().includes(criteria.toLowerCase()) || cv.author.lastname.toLowerCase().includes(criteria.toLowerCase()) ){
        return true;
      }
       }));
  }, [criteria, cvs]);

  return (
    <div className='mt-5 d-flex flex-column align-items-center'>
        <Searchcv criteria={criteria} setCriteria={setCriteria}/>
        <section className='bg-body-tertiary col-12 d-flex flex-row flex-wrap gap-3 justify-content-center p-5'>
            {filteredCvs.map((cv) => (
            <Cardcv key={cv._id} cv={cv} />
            ))}  
        </section>
    </div>
  );
}
