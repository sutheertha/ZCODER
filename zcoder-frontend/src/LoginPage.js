import './LoginPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }
  
      login({
        id: data._id,
        username: data.username,
        email: data.email
      });
  
      history.push(`/profile/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
          <Navbar transparent={true} />
        
        <div className="background-image-container" />
        
        <div className="form-container" >
          <h1>Welcome to Zcoder</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            <Link to='/profile/new' className="signup-button">
              <button type="button">Sign up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;