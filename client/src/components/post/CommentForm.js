//
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addComment} from '../../redux/actions/postActions';

class CommentForm extends Component {
  constructor (props){
    super(props);
    this.state = {
      text : '',
      errors : {}
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors){
      this.setState({errors : newProps.errors});
    }
  }
  //changing field value
  onChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  //sending field to redux
  onSubmit = (event) =>{
    event.preventDefault();

    const {user} = this.props.auth;
    const {postId} = this.props;

    const newComment = {
      text : this.state.text,
      name : user.name,
      avatar : user.avatar
    }
    this.props.addComment(postId , newComment);
    this.setState({text : ''});
  }
  //jsx
  render() {
    const {errors , text} = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit = {this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup 
                name = "text" value = {text} onChange = {this.onChange}
                error = {errors.text} placeholder="Reply to post"
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  postId:PropTypes.string.isRequired,
  errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors : state.errors,
  auth : state.auth
})

export default connect(mapStateToProps , {addComment})(CommentForm);