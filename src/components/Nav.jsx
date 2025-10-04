import { NavLink } from 'react-router-dom';
import './nav.css'
import { FaSpaceAwesome, FaSun, FaMoon } from 'react-icons/fa6';

export default function Nav({ theme, toggleTheme }) {
    return (
        <div>
            <nav style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--text-color)' }} className="nav fixed-top shadow p-2 d-flex justify-content-between align-items-center px-5 mb-5">
                <div className='d-flex gap-3 imgContainer'>
                    <div className="img" style={{ backgroundImage: `url(${theme === 'light' ? '/Logo3.png' : '/Logo.png'})` }} />
                    <h2 className='rahla'>RAHLA CAST</h2>
                </div>

                <div className="d-flex fs-4 gap-5 align-items-center">
                    <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} style={{ color: 'var(--text-color)', textDecoration: "none" }}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""} style={{ color: 'var(--text-color)', textDecoration: "none" }}>
                        About Us
                    </NavLink>
                </div>
                <div className="thema">
                <NavLink to="/checkweather" className={({ isActive }) => isActive ? "active-link" : ""} style={{ color: 'var(--text-color)', textDecoration: "none" }}>
                    <div className='check'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Check Weather
                    </div>
                </NavLink>
                    <div className="theme-toggle" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                        {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={26} />}
                    </div>
                </div>
            </nav>
        </div>
    );
}