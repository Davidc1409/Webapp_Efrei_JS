import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CVDetails() {
    const {id} = useParams()
    const [cv, setCv] = useState(null)

    useEffect(() => {
        const fetchCv = async () => {   
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json()
            setCv(data)
        }
        fetchCv();
    }, [id]);

    if (!cv) {
        return <div>Chargement du CV</div>
    }

    return (
        <div className='container col-8'>
            <h1>{cv.name}</h1>
            <p>Email: {cv.email}</p>
            <p>Téléphone: {cv.phone}</p>
            <p>Adresse: {cv.address.street}, {cv.address.city}</p>
            <p>Société: {cv.company.name}</p>
        </div>
    );
}
