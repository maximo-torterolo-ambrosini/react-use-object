import React, { useState } from 'react'
import useObject from '../../src/useObject'
import Person from './Person'


export default function App() {
  const [name, setName] = useState('Mateo')
  const [updateNameInput, setUpdateNameInput] = useState('')
  const person = useObject(
      () => Person.named(name, 'Rodriguez', 20),
      [name],
      ['birthday'],
  )

  if (!person) return null

  console.log(person)
  return (
    <div style={{ padding: 20 }}>
      <h1>useObject playground</h1>
      <div>
        <p>
          {person.name()}
          {' '}
          is
          {' '}
          {person.age()}
          {' '}
          years old
        </p>
        <button onClick={person.birthday}>Birthday 🎂</button>
      </div>
      <div>
        <p>
          Update name of
          {'  '}
          {person.name()}
        </p>
        <input
          type="text"
          value={updateNameInput}
          onChange={(e) => {
            setUpdateNameInput(e.target.value)
          }}
        />
        <button
          onClick={() =>{
            setName(updateNameInput)
            setUpdateNameInput('')
          }}
        >
            Update
        </button>
      </div>
    </div>
  )
}
