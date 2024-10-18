import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

export default function CVDetails() {
    const {id} = useParams()
    const { isAuthenticated, user } = useAuth()
    const [recommendations, setRecommendations] = useState([])
    const [newRecommendation, setNewRecommendation] = useState('');
    const [cv, setCv] = useState(null)

    useEffect(() => {
        const fetchCv = async () => {   
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json()
            setCv(data)
        }
        fetchCv();

        const fetchRecommandation = async () => {
            const response = await fetch(`/api/recommendations/${id}`);
            const data = await response.json();
            setRecommendations(data);
        }
        fetchRecommandation();
    }, [id]);

    const submitRecommandation = async (e) => {
        e.preventDefault();

        if (!newRecommendation) {
            return;
        }

        const response = await fetch(`/api/recommandations/${id}`, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user.name, text: newRecommendation })
        });
        
        const data = await response.json();
        setRecommendations((previous) => [...previous, data]);
        setNewRecommendation('');

    }

    if (!cv) {
        return <div>Chargement du CV</div>
    }

    return (
        <div className="container">
          <h1>{cv.name}</h1>
          <p>Email: {cv.email}</p>
          <p>Téléphone: {cv.phone}</p>
          <p>Adresse: {cv.address.street}, {cv.address.city}</p>
          <p>Société: {cv.company.name}</p>
    
          <div className="recommendations">
            <h2>Recommandations</h2>
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation">
                <strong>{rec.user}:</strong> {rec.text}
              </div>
            ))}
    
            {isAuthenticated ? (
              <form onSubmit={submitRecommandation}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={newRecommendation}
                    onChange={(e) => setNewRecommendation(e.target.value)}
                    placeholder="Laissez une recommandation..."
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Envoyer la recommandation
                </button>
              </form>
            ) : (
                <a href="/login">Se connecter pour laisser une recommandation</a>
            )}
          </div>
        </div>
      );
    }
