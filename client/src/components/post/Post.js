//import
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getClickedPost} from '../../redux/actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  componentDidMount (){
    this.props.getClickedPost(this.props.match.params.id);
  }
  render() {
    const {post , loading} = this.props.post;
    //some logic
    let postContent;
    if(post === null || loading || Object.keys(post).length === 0 ){
      postContent = <Spinner />
    }else{
      postContent = (
        <div>
          <PostItem post = {post} showAction = {false}/>
          <CommentForm postId = {post._id} />
          <CommentFeed postId = {post._id} comments = {post.comments} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to = "/feed" className = "btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post : PropTypes.object.isRequired,
  getClickedPost : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post : state.post
})

export default connect(mapStateToProps , {getClickedPost})(Post);