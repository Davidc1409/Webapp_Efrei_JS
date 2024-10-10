import React from 'react';

export default function Cardcv({cv}) {


  return (
    <div className="card" style={{width: "18rem",}}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{cv.name}</h5>
            <p className="card-text">Description CV</p>
            <a href="#" className="btn btn-primary">voir le CV</a>
        </div>
    </div>
  );
}



