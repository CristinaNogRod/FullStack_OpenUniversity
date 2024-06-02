import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogRef = useRef()

  const handleLikes = (event) => {
    event.preventDefault()
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, blogObject)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  console.log()

  return (
    <div className="blog">
      <span>{blog.title} {blog.author}</span>
      <Togglable buttonLabel='view' buttonCancel={"hide"} ref={blogRef}>
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={handleLikes}> likes </button>
          <br/>
          {blog.user ? <div>{blog.user.name}</div> : null}
          {user && blog.user && user.username === blog.user.username ? (
            <button onClick={handleDelete}> remove </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  )}

export default Blog

//5.9