import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByHandle} from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './/ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.profile.profile === null && this.props.profile.loading){
      this.props.history.push('/not-found')
    }
  }
  //jsx
  render() {
    const {profile , loading} = this.props.profile;
    //some logic
    let profileContent;
    if(profile === null || loading){
      profileContent = <Spinner />
    }else{
      profileContent = (
        <div>
          <div className="row">
            <div className="com-md-6">
              <Link to = "/profiles" className="btn btn-light mb-3 float-left" >Back To Profiles</Link>
            </div>
            <div className="col-md-6"></div>
          </div>
          <ProfileHeader profile = {profile} />
          <ProfileAbout profile = {profile} />
          <ProfileCreds experience = {profile.experience} education = {profile.eduction} />
          {profile.githubusername ? (
            <ProfileGithub userName = {profile.githubusername} />
          ): null}
        </div>
      )
    }
    return (
      <div>
        {profileContent}
      </div>
    )
  }
}

Profile.propTypes = {
  profile : PropTypes.object.isRequired,
  getProfileByHandle : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
});

export default connect(mapStateToProps , {getProfileByHandle})(Profile);