//import
import React, { Component } from 'react';
import {Link , withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../redux/actions/profileActions';

class AddEducation extends Component {
  constructor(props){
    super(props);
    this.state = {
      school : '',
      degree : '',
      from : '',
      to : '',
      fieldofstudy : '',
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
    const userEdu = {
      school : this.state.school,
      degree : this.state.degree,
      from : this.state.from,
      to : this.state.to,
      fieldofstudy : this.state.fieldofstudy,
      description : this.state.description,
      current : this.state.current,
    }
    this.props.addEducation(userEdu , this.props.history);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit = {this.onSubmit}>
                <TextFieldGroup 
                  placeholder = "* School Or Bootcamp" name = "school" 
                  value = {this.state.school} onChange = {this.onChange} error = {errors.school}
                />
                <TextFieldGroup 
                  placeholder = "* Degree Or Certificate" name = "degree"
                  value = {this.state.degree} onChange = {this.onChange} error = {errors.degree}
                />
                <TextFieldGroup 
                  placeholder = "* Field Of Study" name = "fieldofstudy"
                  value = {this.state.fieldofstudy} onChange = {this.onChange} error = {errors.fieldofstudy}
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
                  placeholder = "Program Description" name = "description" info = "Tell us about the program that you were in"
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

AddEducation.propTypes = {
  profile : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  addExperience : PropTypes.func.isRequired
};
//
const mapStateToProps = state => ({
  profile : state.profile,
  errors : state.errors
})

export default connect(mapStateToProps , {addEducation})(withRouter(AddEducation));