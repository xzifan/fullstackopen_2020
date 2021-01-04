import React, { useEffect  } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import {init} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom'

const App = () => {
  const useraccount = useSelector(({user})=>user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(init())
  }, [dispatch])
  
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Router>
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
            <Switch>
              <Route path='/' exact>
                <BlogForm/>
                <BlogList/>
              </Route>
              <Route path='/users'>
                <UserList/>
              </Route>
            </Switch>
          </div>
          
        }
      </div>
    </Router>
  )
}

export default App