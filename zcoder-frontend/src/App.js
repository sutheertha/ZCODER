import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './Coderoom/App.css';
import Navbar from './Navbar';
import SavedPage from './SavedPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from './PrivateRoute';
import Home from './Coderoom/component/Home';
import EditorPage from './Coderoom/component/EditorPage';
import { Toaster } from 'react-hot-toast';
import Homepage from './HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position='top-center' />
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Navbar />
              <Homepage />
            </Route>
            
            <Route exact path="/login">
              <LoginPage authType="Login" />
            </Route>

            <PrivateRoute exact path="/saved">
              <Navbar />
              <SavedPage />
            </PrivateRoute>

            <PrivateRoute path="/profile/:userID">
              <Navbar />
              <ProfilePage />
            </PrivateRoute>

            <PrivateRoute exact path="/chatroom">
              <Navbar />
              <Home />
            </PrivateRoute>

            <PrivateRoute path="/chatroom/editor/:roomId">
              <Navbar />
              <EditorPage />
            </PrivateRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
