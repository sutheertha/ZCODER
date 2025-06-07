import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './zcoder-logo.png';
import { useAuth } from './AuthContext';


const Navbar = ({transparent = false}) => {
    const { currentUser, logout } = useAuth();
    return ( 
        <nav className={`navbar ${transparent ? 'transparent' : ''}`}>
            <span className="nav-box">
                <div className="website-title">
                    <div className="zcoder-logo-container">
                    <img src={logo} alt="Zcoder Logo" className="zcoder-logo" />
                    <h1 className="navbar-title-heading"> Zcoder </h1>
                    </div>
                </div>
                <div className="navigation links">
                    <Link to='/'> Home </Link>
                    <Link to='/saved'> Bookmarked Questions </Link>
                    <Link to='/editor'> Code Editor </Link>
                    <Link to='/chatroom'> Collaborate </Link>
                    {currentUser ? (
                    <>
                        <Link to={`/profile/${currentUser.id}`}>My Profile</Link>
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>) : (<Link to='/login'> Login / Signup </Link>)
                    }
                </div>
            </span>
        </nav>
     );
}
 
export default Navbar;
