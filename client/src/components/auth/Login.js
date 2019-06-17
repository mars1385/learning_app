//imports
import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../../redux/actions/authActions';
import TestFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  //constructor
  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
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
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
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
    const userData = {
      email : this.state.email,
      password : this.state.password,
    }
    this.props.loginUser(userData);
  }
  //jsx
  render() {
    const {email , password , errors} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TestFieldGroup 
                  name="email" placeholder="Email Address"
                  value={email} onChange={this.onChange}
                  type="email" error={errors.email }
                />
                <TestFieldGroup 
                  name="password" placeholder="Password"
                  value={password} onChange={this.onChange}
                  type="password" error={errors.password }
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

Login.propTypes = {
  loginUser :  PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};
//
const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors
})
export default connect(mapStateToProps , { loginUser })( Login );