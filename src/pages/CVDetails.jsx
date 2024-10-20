import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, UserContext } from '../context/UserContext';

export default function CVDetails() {
    const {id} = useParams()
    const { isAuthenticated, user } = useAuth()
    const [recommendations, setRecommendations] = useState([])
    const [newRecommendation, setNewRecommendation] = useState('');
    const [cv, setCv] = useState(null)
    const { getUserInfos } = useContext(UserContext);
    const userInfo = getUserInfos();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCv = async () => {   
            const response = await fetch(`https://api-efrei-cv-js.onrender.com/api/cv/${id}`);
            const data = await response.json()
            setCv(data)
        }
        fetchCv();

        const fetchRecommandation = async () => {
            const response = await fetch(`https://api-efrei-cv-js.onrender.com/api/recommendation/${id}/recommendations`);
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
        const response = await fetch(`https://api-efrei-cv-js.onrender.com/api/recommendation/${id}/recommendation/`, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
             'Authorization' : `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ user: user.name, text: newRecommendation })
        });
        
        const data = await response.json();
        setRecommendations((previous) => [...previous, data]);
        console.log(recommendations);
        setNewRecommendation('');
        navigate('/');
    }

    if (!cv) {
        return <div>Chargement du CV</div>
    }

    return (
      // <></>
        <div className="container">
          <h1>{cv.author.surname} {cv.author.lastname}</h1>
          {/* <p>Email: {cv.email}</p> */}
          <p>Description : {cv.description}</p>
          <p>Formations : {cv.experiencesPedagogiques}</p>
          <p>Expériences professionelles : {cv.experiencesProfessionnelles}</p>
    
          <div className="recommendations">
            <h2>Recommandations</h2>
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation">
                <strong>{rec.RecAuthor.surname} {rec.RecAuthor.lastname} : </strong> {rec.text}
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
                <link to={'/login'}>Se connecter pour laisser une recommandation</link>
            )}
          </div>
        </div>
      );
    }
