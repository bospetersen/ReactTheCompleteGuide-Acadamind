import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/posts')
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Bo S.'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch((err) => {
        console.log(err)
        // this.setState({ error: true });
      });
  }
  fullArticleHandler = (id) => {
    // this.setState({ selectedPostId: id })

    this.props.history.push({ pathname: '/posts/' + id })
    // this.props.history.push('/' + id)

  }
  render() {
    let data = <p style={{ textAlign: 'center' }}>Something went wrong.</p>
    if (!this.state.error) {
      data = this.state.posts.map((post) => {
        return (
          // <Link to={'/' + post.id} key={post.id}>
          <Post key={post.id}
            clicked={() => this.fullArticleHandler(post.id)}
            title={post.title}
            body={post.body}
            userid={post.userId}
            author={post.author}
          />
          // </Link>
        )
      })
    }

    return (
      <div>
        <section className="Posts">
          {data}
        </section>
        <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;