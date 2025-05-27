import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import noteService from './services/notes'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  function addContact(event) {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newPhone,
      id: String(persons.length + 1),
    }

    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      noteService
        .create(contactObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
        })
    }
    setNewName('')
    setNewPhone('')
  }

  function handleNameChange(event) {
    setNewName(event.target.value)
  }
  function handlePhoneChange(event) {
    setNewPhone(event.target.value)
  }
  function handleFilter(event) {
    setFilter(event.target.value)
  }

  function handleDelete(id){
    const nameToBeDeleted = persons[id - 1].name
    if (window.confirm(`Delete ${nameToBeDeleted}?`)){
      noteService
      .deleteEntry(id)
      .then(deleted => {
        setPersons(persons.filter(person => person.id !== deleted.id))
      })
    } else {
        return
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add New</h2>
        <PersonForm 
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
