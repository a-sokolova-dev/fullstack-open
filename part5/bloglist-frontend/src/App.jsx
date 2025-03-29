import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`Welcome ${user.username}`)
    } catch (error) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      notify(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
    } catch (error) {
      notify('Failed to add blog: ' + error.response?.data?.error || error.message, 'error')
    }
  }

  const handleLike = async (blogToLike) => {
    const updatedBlog = {
      user: blogToLike.user.id || blogToLike.user,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      title: blogToLike.title,
      url: blogToLike.url
    }

    try {
      const returnedBlog = await blogService.update(blogToLike.id, updatedBlog)
      setBlogs(blogs.map(blog =>
        blog.id === blogToLike.id ? returnedBlog : blog
      ))
    } catch (error) {
      notify('Failed to like blog: ' + error.response?.data?.error || error.message, 'error')
    }
  }

  const handleDelete = async (blogToDelete) => {
    const confirmMessage = `Remove blog "${blogToDelete.title}" by ${blogToDelete.author}?`
    if (!window.confirm(confirmMessage)) return

    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      notify(`Deleted "${blogToDelete.title}"`)
    } catch (error) {
      notify('Failed to delete blog: ' + (error.response?.data?.error || error.message), 'error')
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
