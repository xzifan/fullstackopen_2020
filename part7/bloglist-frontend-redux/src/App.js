import React, { useEffect  } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import {init} from './reducers/blogReducers'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './reducers/loginReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState([])
  // const [password, setPassword] = useState([])
  // const [useraccount, setUser] = useState([])
  const useraccount = useSelector(({user})=>user)
  // const [title, setTitle] = useState([])
  // const [author, setAuthor] = useState([])
  // const [url, setUrl] = useState([])
  // const [prompt,setPrompt] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    // updateList()
    dispatch(init())
  }, [dispatch])
  
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }else setUser(null)
  // }, [])
  // const updateList = async () => {
  //   var res = await blogService.getAll()
  //   console.log(res)
  //   res.sort((a,b) => b.likes-a.likes)
  //   setBlogs(res)
  // }
  // const showPrompt = (type,text) => {
  //   setPrompt({ type,text })
  //   setTimeout(() => {
  //     setPrompt({})
  //   }, 5000)
  // }
  // const handleChange = (e) => {
  //   var val = e.target.value
  //   switch(e.target.name) {
  //   case 'username':
  //     setUsername(val)
  //     break
  //   case 'password':
  //     setPassword(val)
  //     break
  //   case 'title':
  //     setTitle(val)
  //     break
  //   case 'author':
  //     setAuthor(val)
  //     break
  //   case 'url':
  //     setUrl(val)
  //     break
  //   default:

  //   }
  // }

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const user = await blogService.login({
  //       username, password,
  //     })
  //     console.log(user)
  //     window.localStorage.setItem(
  //       'loggedUser', JSON.stringify(user)
  //     )
  //     showPrompt('success','Login succeed!')
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //   } catch (error) {
  //     showPrompt('error',error.response.data.error)
  //   }
  // }
  const handleLogout = () => {
    // window.localStorage.removeItem('loggedUser')
    // window.location.reload()
    dispatch(logout())
  }


  // const handleCreate = async(e) => {
  //   e.preventDefault()
  //   try {
  //     await blogService.create({
  //       author, title, url
  //     })
  //     blogFormRef.current.toggleVisibility()
  //     showPrompt('success',`a new blog ${title} by ${author} added`)
  //     updateList()
  //     setTitle('')
  //     setUrl('')
  //     setAuthor('')
  //   } catch (error) {
  //     showPrompt('error',error.response.data)
  //   }
  // }

  // const likeIncrement = async (e,id,update) => {
  //   e.preventDefault()
  //   try {
  //     await blogService.update(id,update)
  //     showPrompt('success',`You liked ${update.title} by ${update.author}`)
  //     updateList()
  //   } catch(error){
  //     showPrompt('error',error.response.data.error||error)
  //   }
  // }

  // const handleDel = async (e,id, title, author) => {
  //   e.preventDefault()
  //   if (window.confirm(`Remove blog ${title} by ${author}`))
  //     try {
  //       await blogService.remove(id)
  //       showPrompt('success',`Blog ${title} by ${author} is removed`)
  //       updateList()
  //     } catch(error) {
  //       showPrompt('error',error.response.data.error||error)
  //     }
  // }

  // const promptObject = <div className={prompt.type}>{prompt.text}</div>

  // const loginForm = () =>
  //   <div className='loginbox'>
  //     <LoginForm/>
  //   </div>
  // const blogFormRef = useRef()
  // const blogForm = () =>
  //   <div className='create'>
  //     <Togglable buttonLabel="create new blog" ref={blogFormRef}>
  //       <BlogForm/>
  //     </Togglable>
  //   </div>


  return (
    <div>
      <div className='blogs'>
        <h1>blogs</h1>
        <div className='notification'><Notification/></div>
        {useraccount === null ?
          <div className='loginbox'>
          <LoginForm/>
        </div>
          :
          <div>
            <p>{useraccount.name} logged in <button className='btnLogout' onClick={handleLogout}>log out</button></p>
            <BlogForm/>
            <BlogList/>
          </div>
        }
      </div>
    </div>
  )
}

export default App