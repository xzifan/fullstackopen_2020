import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom'
import './hooks'
import { useAnecdoteForm } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdotes})=> {
  const id = useParams().id
  console.log(anecdotes)
  const anecdote = anecdotes.find(n=> Number(n.id) === Number(id))
  return (
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:anecdoteForm.content,
      author:anecdoteForm.author,
      info:anecdoteForm.info,
      votes: 0
    })
    history.push('/')
  }
  
  const anecdoteForm = useAnecdoteForm(props.anecdotes)
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={anecdoteForm.content} onChange={anecdoteForm.onChange} />
        </div>
        <div>
          author
          <input name='author' value={anecdoteForm.author} onChange={anecdoteForm.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={anecdoteForm.info} onChange={anecdoteForm.onChange} />
        </div>
        <button type='submit'>create</button> <button type='reset' onClick={anecdoteForm.clearForm}>clear</button>
      </form>
    </div>
  )

}

const App = (props) => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(anecdote.content)
  }
  const showNotification = (content)=>{
    setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000);
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu/>
        <div>{notification}</div>
      </div>
        <Switch>
          <Route path='/' exact><AnecdoteList anecdotes={anecdotes}/></Route>
          <Route path='/anecdotes/:id'><Anecdote anecdotes={anecdotes}/></Route>
          <Route path='/create'><CreateNew addNew={addNew} anecdotes={anecdotes}/></Route>
          <Route path='/about'><About/></Route>
        </Switch>
        
        <Footer/>
      
    </Router>
  )
}

export default App;
