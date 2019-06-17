//
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import {getPost} from '../../redux/actions/postActions';
import PostFeed from './PostFeed';


class Posts extends Component {
  componentDidMount(){
    this.props.getPost();
  }
  //jsx
  render() {
    const {posts , loading} = this.props.post;
    //some logic
    let postContent;
    if(posts === null || loading ){
      postContent = <Spinner />
    }else{
      postContent = <PostFeed posts = {posts} /> 
    }

    return (
      <div className = "feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
            {postContent}
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post : PropTypes.object.isRequired,
  getPost : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post : state.post
})

export default connect(mapStateToProps , {getPost})(Posts);