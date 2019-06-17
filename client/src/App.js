//imports
import React , {Component} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode' ;
import setAuthToken from './utils/setAuthToken';
import './App.css';
//import redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {setCurrentUser, logoutUser} from './redux/actions/authActions';
import {clearCurrentProfile} from './redux/actions/profileActions';
//import layouts components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
//import Auth components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//import dashboard & common $ profile component 
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profile from './components/profile/Profile';
//import from credentials & profiles
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
//import not found & post
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//check to see if user already login
if(localStorage.jwtToken){
  //set token to all auth req
  setAuthToken(localStorage.jwtToken);
  //decoding jwt token
  const decode = jwt_decode(localStorage.jwtToken);
  //dispatching user info
  store.dispatch(setCurrentUser(decode));
  //check to see jwt token is expire?
  const currentTime = Date.now() / 1000;
  if(decode.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
    //clear user profile
    store.dispatch(clearCurrentProfile());
    //redirect
    window.location.href = '/login';
  }
}

class App extends Component {
  render(){
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;