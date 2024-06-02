import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({message: 'Wrong credentials', type: "error"})
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setNotification({message:'Failed to Logout', type:"error"})
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    // blogFormRef.current.toggleVisibility()

    // POST request & reset states
    blogService
      .create(blogObject)
      .then(returnBlog => {
        setBlogs(blogs.concat(returnBlog))
        setLoginVisible(false)
        setNotification({message: `Added new blog`, type: "sucess"})
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      })
  }

  const handleLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnBlog))
      })
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this blog?")) {
      blogService
      .remove(id)
      .then( () => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
    }
  }


  const loginForm = () => {
    
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <Login 
            handleLogin={handleLogin} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            username={username} 
            password={password}
          />     
      </div>
    )}

  const showBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type} />
        <span>{user.name} logged in</span>
        <button onClick={handleLogout} type="button">logout</button>

        <h2>create new blog</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
          
        <p/> 
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleLikes} deleteBlog={handleDelete} user={user}/>
        )}
      </div>
    )}

  return (
    <div>
      {user === null ? loginForm() : showBlogs()}
    </div>
  )
}

export default App