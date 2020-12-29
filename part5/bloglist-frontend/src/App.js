import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogFrom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [useraccount, setUser] = useState([])
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
  const [prompt,setPrompt] = useState([])
  
  useEffect(() => {
    updateList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }else setUser(null)
  }, [])
  const updateList = ()=>{
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }
  const showPrompt = (type,text)=>{
    setPrompt({type,text})
    setTimeout(() => {
      setPrompt({})
    }, 5000);
  }
  const handleChange = (e)=>{
    var val = e.target.value
    switch(e.target.name) {
      case 'username':
        setUsername(val)
        break
      case 'password':
        setPassword(val)
        break
      case 'title':
        setTitle(val)
        break
      case 'author':
        setAuthor(val)
        break
      case 'url':
        setUrl(val)
        break
      default:

    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const user = await blogService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      showPrompt('success','Login succeed!')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showPrompt('error',error.response.data.error)
    }
  }
  const handleLogout = ()=>{
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }


  const handleCreate = async(e)=>{
    e.preventDefault();
    try {
      await blogService.create({
        author, title, url
      })
      blogFormRef.current.toggleVisibility()
      showPrompt('success',`a new blog ${title} by ${author} added`)
      updateList()
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (error) {
      showPrompt('error',error.response.data.error||error)
    }
  }
  const promptObject =()=> <div className={prompt.type}>{prompt.text}</div>

  const loginForm = () =>
    <Togglable buttonLabel='login' >
      <LoginForm
        handleChange={handleChange}
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </Togglable>
  const blogFormRef = useRef()
  const blogForm = () => 
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm
        onSubmit={handleCreate}
        handleChange={handleChange}
        newBlog={{title,author,url}}
      />
    </Togglable>
  
                    
  return (
    <div>
      <div className='blogs'>
        <h1>blogs</h1>
        {promptObject()}
        {useraccount === null ?
          loginForm() :
          <div>
            <p>{useraccount.name} logged in <button onClick={handleLogout}>log out</button></p>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
      </div>     
    </div>
  )
}

export default App