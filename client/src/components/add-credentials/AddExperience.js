//import
import React, { Component } from 'react';
import {Link , withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience} from '../../redux/actions/profileActions';

class AddExperience extends Component {
  constructor(props){
    super(props);
    this.state = {
      company : '',
      location : '',
      from : '',
      to : '',
      title : '',
      description : '',
      current : false,
      errors : {},
      disabled : false
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
    }
  }
  //changing field value
  onChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  //sending field to redux
  onSubmit = (event) =>{
    event.preventDefault();
    const userExp = {
      company : this.state.company,
      location : this.state.location,
      from : this.state.from,
      to : this.state.to,
      title : this.state.title,
      description : this.state.description,
      current : this.state.current,
    }
    this.props.addExperience(userExp , this.props.history);
  }
  onCheck = (event) => {
    this.setState({
      disabled : !this.state.disabled,
      current : !this.state.current
    });
  }
  //jsx
  render() {
    const {errors} = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit = {this.onSubmit}>
                <TextFieldGroup 
                  placeholder = "* Company" name = "company" 
                  value = {this.state.company} onChange = {this.onChange} error = {errors.company}
                />
                <TextFieldGroup 
                  placeholder = "* Job Title" name = "title"
                  value = {this.state.title} onChange = {this.onChange} error = {errors.title}
                />
                <TextFieldGroup 
                  placeholder = "Location" name = "location"
                  value = {this.state.location} onChange = {this.onChange} error = {errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup 
                  type = "date" name = "from"
                  value = {this.state.from} onChange = {this.onChange} error = {errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup 
                  type = "date" name = "to" disabled = {this.state.disabled ? 'disabled' : ''}
                  value = {this.state.to} onChange = {this.onChange} error = {errors.to}
                />
                <div className = "form-check mb-4">
                  <input className = "form-check-input" type = "checkbox" 
                  name = "current" onChange = {this.onCheck}
                  value = {this.state.current} checked = {this.state.current} id = "current" />
                  <label className = "form-check-label" htmlFor = "current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup 
                  placeholder = "Job Description" name = "description" info = "Tell us about the position"
                  value = {this.state.description} onChange = {this.onChange} error = {errors.description}
                />
                <input type = "submit" value = "submit" className = "btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  profile : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  addExperience : PropTypes.func.isRequired
};
//
const mapStateToProps = state => ({
  profile : state.profile,
  errors : state.errors
})

export default connect(mapStateToProps , {addExperience})(withRouter(AddExperience));