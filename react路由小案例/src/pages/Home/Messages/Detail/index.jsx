import React, { Component } from "react"

export default class Detail extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    
    if (this.state.posts.length > 0 && this.state.posts.id === id) return
    fetch(`http://localhost:8000/posts`)
      .then(response => response.json())
      .then(data => this.setState({ posts: data }))
      .catch(error => console.log(error.message))
  }
  componentWillUnmount() {
    console.log('马上卸载组件了')
    this.setState = (state, callback) => {
      return
    }
  }

  render() {
    // console.log(this.props)
    const { posts} = this.state
    const {match: {params: { id:id1 }}} = this.props
    const newPost = posts.find(postObj => postObj.id == id1)

    const {id,title,author} = newPost || {id:'Loading...'}
    return (
      <div>
        <ul>
          <li>{id}</li>
          <li>{title}</li>
          <li>{author}</li>
        </ul>
      </div>
    )
  }
}
