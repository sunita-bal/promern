import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom'
import logo from '../assests/logo.png'
import { UserContext } from '../App';

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink >
                    </li>

                </>
            )
        }
        else {
            return (
                <>
                 <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Sign Up</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">Sign In</NavLink >
                    </li>
                </>
            )

        }
    }
    return (
        <>
            <nav className="navbar pt-3 navbar-expand-lg ">
                <NavLink className="navbar-brand" to="/"><img className="logo" src={logo} alt="logo" />
                </NavLink >
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">

                        <RenderMenu />
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
