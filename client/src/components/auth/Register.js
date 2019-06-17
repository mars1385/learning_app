//imports
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {registerUser} from '../../redux/actions/authActions';
import {withRouter} from 'react-router-dom';
import TestFieldGroup from '../common/TextFieldGroup';


class Register extends Component {
  //constructor
  constructor(){
    super();
    this.state = {
      name : '',
      email : '',
      password : '',
      password2 : '',
      errors : {}
    }
  }
  //see if user already login
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
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
    const newUser = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      password2 : this.state.password2
    }
    this.props.registerUser(newUser , this.props.history);
  }

  //jsx
  render() {

    const {name , email , password , password2 , errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TestFieldGroup 
                  name="name" placeholder="Name"
                  value={name} onChange={this.onChange}
                  error={errors.name }
                />
                <TestFieldGroup 
                  name="email" placeholder="Email Address"
                  value={email} onChange={this.onChange}
                  type={email} error={errors.email }
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TestFieldGroup 
                  name="password" placeholder="Password"
                  value={password} onChange={this.onChange}
                  type="password" error={errors.password }
                />
                <TestFieldGroup 
                  name="password2" placeholder="Password"
                  value={password2} onChange={this.onChange}
                  type="password" error={errors.password2 }
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//redux
Register.propTypes = {
  registerUser :  PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};
//
const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors
})
export default connect(mapStateToProps , { registerUser })(withRouter( Register ));