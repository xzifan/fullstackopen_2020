import React, { useEffect  } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import UserList from './components/UserList'
import User  from './components/User'
import {init} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from './reducers/loginReducer'
import { getUsers} from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import BlogView from './components/BlogView'

const App = () => {
  const useraccount = useSelector(({user})=>user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(init())
    dispatch(getUsers())
  }, [dispatch])
  
  // const handleLogout = () => {
  //   dispatch(logout())
  // }

  return (
    <Router>
      {useraccount? <Navigation/>:''}
      <div className='blogs'>
        <h1>blogs</h1>
        <div className='notification'><Notification/></div>
        {useraccount === null ?
          <div className='loginbox'>
            <LoginForm/>
          </div>
          :
          <div>
            
            <Switch>
              <Route path='/' exact>
                <BlogForm/>
                <BlogList/>
              </Route>
              <Route path='/users' exact>
                <UserList/>
              </Route>
              <Route path='/users/:id'>
                <User/>
              </Route>
              <Route path='/blogs/:id'>
                <BlogView/>
              </Route>
            </Switch>
          </div>
          
        }
      </div>
    </Router>
  )
}

export default App