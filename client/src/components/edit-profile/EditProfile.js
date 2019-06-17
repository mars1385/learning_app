//import
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import {withRouter} from 'react-router-dom';
import {createUserProfile , getCurrentProfile} from '../../redux/actions/profileActions';
import isEmpty from '../../validation/is-empty';
import {Link} from 'react-router-dom';

class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      displaySocialInputs : false,
      handle : '',
      company : '',
      website : '',
      location : '',
      status : '',
      skills : '',
      githubusername : '',
      bio : '',
      youtube : '',
      twitter : '',
      facebook : '',
      linkedin : '',
      instagram : '',
      errors : {}
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
    }
    //fill current field
    if(nextProps.profile.profile){
      const userProfile = nextProps.profile.profile;
      const skillsCSV = userProfile.skills.join(',');
      //check to see if field is empty?
      userProfile.company = !isEmpty(userProfile.company) ? userProfile.company : '' ;
      userProfile.website = !isEmpty(userProfile.website) ? userProfile.website : '' ;
      userProfile.location = !isEmpty(userProfile.location) ? userProfile.location : '' ;
      userProfile.githubusername = !isEmpty(userProfile.githubusername) ? userProfile.githubusername : '' ;
      userProfile.bio = !isEmpty(userProfile.bio) ? userProfile.bio : '' ;
      userProfile.social = !isEmpty(userProfile.social) ? userProfile.social : {} ;
      userProfile.twitter = !isEmpty(userProfile.social.twitter) ? userProfile.social.twitter : '' ;
      userProfile.facebook = !isEmpty(userProfile.social.facebook) ? userProfile.social.facebook : '' ;
      userProfile.linkedin = !isEmpty(userProfile.social.linkedin) ? userProfile.social.linkedin : '' ;
      userProfile.youtube = !isEmpty(userProfile.social.youtube) ? userProfile.social.youtube : '' ;
      userProfile.instagram = !isEmpty(userProfile.social.instagram) ? userProfile.social.instagram : '' ;
      
      //set profile field in component state
      this.setState({
        handle : userProfile.handle,
        company : userProfile.company,
        website : userProfile.website,
        location : userProfile.location,
        status : userProfile.status,
        skills : skillsCSV,
        githubusername : userProfile.githubusername,
        bio : userProfile.bio,
        youtube : userProfile.youtube,
        twitter : userProfile.twitter,
        facebook : userProfile.facebook,
        linkedin : userProfile.linkedin,
        instagram : userProfile.instagram
      });
    }
  }
  //changing field value
  onChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  //sending field to redux
  onSubmit = (event) =>{
    event.preventDefault();
    
    const profileData = {
      handle : this.state.handle,
      company : this.state.company,
      website : this.state.website,
      location : this.state.location,
      status : this.state.status,
      skills : this.state.skills,
      githubusername : this.state.githubusername,
      bio : this.state.bio,
      youtube : this.state.youtube,
      twitter : this.state.twitter,
      facebook : this.state.facebook,
      linkedin : this.state.linkedin,
      instagram : this.state.instagram
    }
    this.props.createUserProfile(profileData , this.props.history);

  }
  //jsx
  render() {
    const {errors , displaySocialInputs} =  this.state;
    //social group
    let socialInputs;
    if(displaySocialInputs){
      socialInputs = (<div>
        <InputGroup
          placeholder = "Twitter Profile URL" name = "twitter"
          icon = "fab fa-twitter" value = {this.state.twitter}
          error = {errors.twitter} onChange = {this.onChange}
        />
        <InputGroup
          placeholder = "Facebook Profile URL" name = "facebook"
          icon = "fab fa-facebook" value = {this.state.facebook}
          error = {errors.facebook} onChange = {this.onChange}
        />
        <InputGroup
          placeholder = "Linkedin Profile URL" name = "linkedin"
          icon = "fab fa-linkedin" value = {this.state.linkedin}
          error = {errors.linkedin} onChange = {this.onChange}
        />
        <InputGroup
          placeholder = "Youtube Profile URL" name = "youtube"
          icon = "fab fa-youtube" value = {this.state.youtube}
          error = {errors.youtube} onChange = {this.onChange}
        />
        <InputGroup
          placeholder = "Instagram Profile URL" name = "instagram"
          icon = "fab fa-instagram" value = {this.state.instagram}
          error = {errors.instagram} onChange = {this.onChange}
        />
      </div>)
    }
    //select option
    const options = [
      {label : '* Select Professional Status' , value : 0},
      {label : 'Developer' , value : 'Developer'},
      {label : 'Junior Developer' , value : 'Junior Developer'},
      {label : 'Senior Developer' , value : 'Senior Developer'},
      {label : 'Manager' , value : 'Manager'},
      {label : 'Student or Learning' , value : 'Student or Learning'},
      {label : 'Instructor or Teacher' , value : 'Instructor or Teacher'},
      {label : 'Intern' , value : 'Intern'},
      {label : 'Other' , value : 'Other'},
    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder = "* Profile handle" type = "text" name = "handle"
                  error = {errors.handle} value = {this.state.handle} onChange = {this.onChange}
                  info = "A unique handle for your profile URL. Your full name, company name, nickname, etc"
                />
                <SelectListGroup 
                  placeholder = "status" name = "status" options = {options}
                  error = {errors.status} value = {this.state.status} onChange = {this.onChange}
                  info = "Give us an idea of where you are at in your career"
                />
                <TextFieldGroup 
                  placeholder = "Company" type = "text" name = "company"
                  error = {errors.company} value = {this.state.company} onChange = {this.onChange}
                  info = "Could be your own company or one you work for"
                />
                <TextFieldGroup 
                  placeholder = "Website" type = "text" name = "website"
                  error = {errors.website} value = {this.state.website} onChange = {this.onChange}
                  info = "Could be your own or a company website"
                />
                <TextFieldGroup 
                  placeholder = "Location" type = "text" name = "location"
                  error = {errors.location} value = {this.state.location} onChange = {this.onChange}
                  info = "City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup 
                  placeholder = "* Skills" type = "text" name = "skills"
                  error = {errors.skills} value = {this.state.skills} onChange = {this.onChange}
                  info = "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup 
                  placeholder = "Github Username" type = "text" name = "githubusername"
                  error = {errors.githubusername} value = {this.state.githubusername} 
                  onChange = {this.onChange}
                  info = "If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup 
                  placeholder = "A short bio of yourself" name = "bio"
                  error = {errors.bio} value = {this.state.bio} onChange = {this.onChange}
                  info = "Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button className="btn - btn-light" type="button" 
                  onClick = {() => {this.setState(prevState => 
                    ({displaySocialInputs : !prevState.displaySocialInputs}))}}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type = "submit" value = "submit" className = "btn btn-info btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//redux
EditProfile.propTypes = {
  errors : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  createUserProfile : PropTypes.func.isRequired,
  getCurrentProfile : PropTypes.func.isRequired
};
//
const mapStateToProps = state => ({
  errors : state.errors,
  profile : state.profile
})

export default connect(mapStateToProps , {createUserProfile , getCurrentProfile})(withRouter(EditProfile));