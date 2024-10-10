import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

Navbar.propTypes = {

}

export default function Navbar({}) {
    const navItems = [
        {"Home" : "http://localhost:5173"},
        // {"Count" : "http://localhost:5173/count"},
        // {"FilterList" : "http://localhost:5173/filterlist"},
        // {"Users" : "http://localhost:5173/users"},
        {"Register" : "http://localhost:5173/register"},
        // {"Login" : "http://localhost:5173/login"}
    ]

    let listNavItem = [];
    navItems.map((item)=>{
        let key = Object.keys(item)[0];
        let link = Object.values(item)[0];
        listNavItem.push(<li className="nav-item" key={navItems.indexOf(item)}><a className="nav-link" href={link}>{key}</a></li>)
    });

  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary row">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Efrei ReactJS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {listNavItem}
            </ul>
          </div>
        </div>
      </nav>
  )
}
