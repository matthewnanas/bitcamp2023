import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../Assets/LogoRed.svg'
import './Navbar.css'

export default function Navbar() {
    const [showNavbar, setShowNavbar] = React.useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} height={45} alt='logo' />
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <h1>B</h1>
                </div>
                <div className={`nav-elements ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <button className='register' onClick={() => alert('Clicked')}>
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}