import React from 'react';
import './css/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const logout = () => {
        localStorage.removeItem('token')
    }
    var token = localStorage.getItem('token')
    return (
        <div className='navbar__group'>
            <nav className="navbar__main">
                <div className='navbar__left'>
                    <Link to='/' className="navbar__title">
                        Hepoku
                    </Link>
                </div>
                {token ? 
                    <div className='navbar__right' id="col_div">
                        <Link to="/user/profile" className="navabr__profile">
                            Profile
                        </Link>
                        <Link to="/post/create" className="navabr__profile">
                            CreatePost
                        </Link>
                        <Link to="/login" onClick={logout} className="navabr__logout">
                            Logout
                        </Link>
                    </div>
                    :
                    <div className='navbar__right' id="col_div">
                        <Link to="/login" className="navabr__login">
                            Login
                        </Link>
                        <Link to="/signup" className="navabr__signup">
                            Signup
                        </Link>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;
