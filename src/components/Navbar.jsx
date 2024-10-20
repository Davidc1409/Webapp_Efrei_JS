import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';


Navbar.propTypes = {

}

function Navbar({}) {

    const { getUserInfos, logout } = useContext(UserContext);
    const user = getUserInfos();
 
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/'} className={'nav-link'}>
                Home
                </Link>
                {/* <a className="nav-link" href="/">Home</a> */}
              </li>
              { user &&
                (<li className="nav-item">
                  <Link to={'/cvmanagement'} className={'nav-link'}>
                    My CV
                  </Link>
                  {/* <a className="nav-link" href="/cvmanagement">My CV</a> */}
                </li>)
              }
              <li className="nav-item">
                <Link to={'/register'} className={'nav-link'}>
                  Register
                </Link>
                {/* <a className="nav-link" href="/register">Register</a> */}
              </li>
              {user ? 
                (<li className="nav-item">
                  <Link to={'/register'} className={'nav-link'} onClick={(e)=>logout(e)}>
                    Logout
                  </Link>
                 {/* <a href="/" className={'nav-link'} onClick={(e)=>logout(e)}>Logout</a> */}
                </li>)
                :
                (<li className="nav-item">
                  <Link to={'/login'} className={'nav-link'}>
                    Login
                  </Link>
                </li>)
              }
              
            </ul>
          </div>
        </div>
      </nav>
  )
}
export default Navbar;

