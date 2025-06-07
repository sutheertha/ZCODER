import { Switch, Route } from 'react-router-dom'; 
import './App.css';
import Navbar from './Navbar';
import SavedPage from './SavedPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Navbar />
            <h1>HOMEPAGE</h1>
          </Route>

          <PrivateRoute exact path="/saved">
            <Navbar />
            <SavedPage />
          </PrivateRoute>

          <Route exact path="/login">
            <LoginPage authType="Login" />
          </Route>

          <PrivateRoute path="/profile/:userID">
            <Navbar />
            <ProfilePage />
          </PrivateRoute>

          <PrivateRoute path="/editor">
            <Navbar />
            <h2>code editor</h2>
          </PrivateRoute>

          <PrivateRoute path="/chatroom">
            <Navbar />
            <h2>chatroom</h2>
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
