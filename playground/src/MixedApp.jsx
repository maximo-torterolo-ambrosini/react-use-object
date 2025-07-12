import React, { useState } from 'react'
import Person from './Person'
import { useObject } from '@cactusjackson/react-use-object'
import RenderCount from './RenderCount'

export default function MixedApp() {
  const [name, setName] = useState('Mateo')
  const [updateNameInput, setUpdateNameInput] = useState('')
  const person = useObject(
      () => Person.named(name, 'Rodriguez', 20),
      [name],
      ['birthday'],
  )
  return (
    <div style={{ padding: 20, height: '100%' }}>
      <h1>Mixed playground</h1>
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
      <RenderCount/>
    </div>
  )
}
