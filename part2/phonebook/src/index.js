import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import persons from './services/persons'


const App = () => {
  const [list, setList] = useState([ ])
  useEffect(()=>{
    updateList()
  },[])
  const updateList = ()=>{
    persons.getAll().then(res=>{
      setList(res.data)
    })
  }

  const [filter,setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}/>

      <h3>Add a new</h3>
      <PersonForm 
        list={list}
        updateList={updateList}
      />

      <h3>Numbers</h3>
      <Persons 
        list={list} 
        filter={filter} 
        updateList={updateList}
      />
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
  let list = props.list
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addNumber = (name,number)=>{
    persons
      .post({name:name,number:number})
      .then(res=>{
        if (res.status===201){
          props.updateList()
        }
      }).catch((error) =>{
        console.log(error);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let names = list.map((person, i) => person.name)
    if (names.indexOf(newName) === -1) {
      addNumber(newName,newNumber)
    } else {
      console.log(list[names.indexOf(newName)].id)
      let confirm = window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")
      if (confirm)
        persons.update(list[names.indexOf(newName)].id,{name:newName, number:newNumber}).then(props.updateList())
    }
  }
  const handleInput = (e) => {
    if (e.target.name === "name")
      setNewName(e.target.value)
    else if (e.target.name === "number")
      setNewNumber(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input name="name" type="text" onChange={handleInput} />
      </div>
      <div>
        number: <input name="number" type="text" onChange={handleInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props)=>{
  const handleDelete = (e)=>{
    let id = e.target.value
    let name = e.target.name
    console.log(id, name)
    let confirm = window.confirm(`Delete ${name}?`)
    if (confirm)
      persons.deleteItem(id).then(()=>{
        props.updateList()
      })
  }
  return <div>
    {
        props.list.map((person, index) => {
          if (person.name.indexOf(props.filter)!==-1)
            return <div key={index}>{person.name+" "+person.number} <button name={person.name} value={person.id} onClick={handleDelete}>delete</button></div>
        })
      }
  </div>
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

