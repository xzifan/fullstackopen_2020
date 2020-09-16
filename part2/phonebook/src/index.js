import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([ ])
  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then(res=>{
      console.log(res)
      setPersons(res.data)
    })
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    let names = persons.map((person, i) => person.name)
    if (names.indexOf(newName) === -1) {
      const copy = [...persons]
      copy.push({ name: newName, number: newNumber })
      setPersons(copy)
    } else alert(`${newName} is already added to phonebook`)

  }
  const handleInput = (e) => {
    if (e.target.name === "name")
      setNewName(e.target.value)
    else if (e.target.name === "number")
      setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}/>

      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleInput={handleInput}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}
const Filter = (props)=>{
  const setFilter = props.setFilter
  const handleFilter = (e)=>{
    setFilter(e.target.value)
  }
  return(<div>
    filter shows with <input onChange={handleFilter}/>
  </div>)
}

const PersonForm =(props)=>{

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input name="name" type="text" onChange={props.handleInput} />
      </div>
      <div>
        number: <input name="number" type="text" onChange={props.handleInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props)=>{
  return <div>
    {
        props.persons.map((person, index) => {
          if (person.name.indexOf(props.filter)!==-1)
            return <div key={index}>{person.name+" "+person.number}</div>
        })
      }
  </div>
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

