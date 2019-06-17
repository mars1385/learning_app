//import
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfilesItem from './ProfilesItem';


class Profiles extends Component {
  componentDidMount(){
    this.props.getProfiles();
  }
  //jsx
  render() {
    const {profiles , loading} = this.props.profile;
    //some logic
    let profileItems;
    if(profiles === null || loading){
      profileItems = <Spinner />
    }else{
      if(profiles.length > 0){
        profileItems = profiles.map(profile => (
          <ProfilesItem key = {profile._id} profile = {profile} />
        ))
      }else{
        profileItems = <h4>No Profiles found....</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  profile : PropTypes.object.isRequired,
  getProfiles : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
});

export default connect(mapStateToProps , {getProfiles})(Profiles); 