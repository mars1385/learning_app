//import
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile , deleteUserAccount} from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

  componentDidMount(){
    this.props.getCurrentProfile();
  }

  onDeleteClick = (event) => {
    this.props.deleteUserAccount();
  }
  //jsx
  render() {
    
    const {user} = this.props.auth;
    const {profile , loading} = this.props.profile;
    //logic
    let dashboardContent;
    if(profile === null || loading) {
      dashboardContent = <Spinner />
    }else{
      //user dose have profile
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profiles/${profile.handle}`} >{user.name}
            </Link> </p>
            <ProfileActions />
            <Experience experience = {profile.experience} />
            <Education education = {profile.eduction} />
            <div style={{marginBottom : '60px'}}></div>
            <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
          </div>
        );
      }else{
        //user do not have profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//redux
Dashboard.propTypes = {
  getCurrentProfile :  PropTypes.func.isRequired,
  deleteUserAccount :  PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
};
//
const mapStateToProps = state => ({
  auth : state.auth,
  profile : state.profile
})

export default connect(mapStateToProps , {getCurrentProfile , deleteUserAccount})(Dashboard);