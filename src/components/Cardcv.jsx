import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cardcv({cv}) {
  const navigate = useNavigate();

  const ViewCv = () => {
    navigate(`/CVDetails/${cv.id}`)
  }

  return (
    <div className="card" style={{width: "18rem",}}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{cv.name}</h5>
            <p className="card-text">Description CV</p>
            <a href="#" className="btn btn-primary" onClick={ViewCv}>voir le CV</a>
        </div>
    </div>
  );
}



