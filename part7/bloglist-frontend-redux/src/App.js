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
  const useraccount = useSelector(({user})=>user)
  const dispatch = useDispatch()
  useEffect(() => {
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
    dispatch(logout())
  }

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