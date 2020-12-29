import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'


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
      showPrompt({type:'success',text:'Login succeed!'})
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
      const res = await blogService.create({
        author, title, url
      })
      console.log(res)
      showPrompt('success',`a new blog ${title} by ${author} added`)
      updateList()
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (error) {
      showPrompt('error',error.response.data.error)
    }
  }
  const promptObject = <div className={prompt.type}>{prompt.text}</div>
  const loginForm = <form className='form' onSubmit={handleLogin}>
                      <h2>log in to application</h2>
                      {promptObject}
                      <label>username<input type='text' name='username' onChange={handleChange} /></label>
                      <label>password<input type='password' name='password' onChange={handleChange} /></label>
                      <input type="submit" value='submit'/>
                    </form>
  const creationForm = <form className='form' onSubmit={handleCreate}>
                        <h2>create new</h2>
                        <label>title:<input type='text' name='title' onChange={handleChange} /></label>
                        <label>author:<input type='text' name='author' onChange={handleChange} /></label>
                        <label>url:<input type='text' name='url' onChange={handleChange} /></label>
                        <input type="submit" value='create'/>
                      </form>
  const bloglist = <div>
                    <div className='blogs'>
                      <h2>blogs</h2>
                      {promptObject}
                      <span className='user'>{useraccount==null?'':useraccount.name} logged in  <button onClick={handleLogout}>log out</button></span>
                      {creationForm}
                      {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                      )}
                    </div>     
                  </div>
  return (
    <div>
      {useraccount==null? loginForm : bloglist}
    </div>
  )
}

export default App