import React from 'react'
import Person from './Person'
import { useObject } from '@cactusjackson/react-use-object'
import Input from './Input'
import RenderCount from './RenderCount'

export default function ObjectfulApp() {
  const input = useObject(() => new Input(''), [], ['setInitialValue'])
  const person = useObject(
      () => Person.named(input.initialValue() || 'Nazareno', 'Rodriguez', 20),
      [],
      ['birthday', 'changeName'],
  )

  return (
    <div style={{ padding: 20, height: '100%' }}>
      <h1>Objectful playground</h1>
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
          value={input.initialValue()}
          onChange={(e) => {
            input.setInitialValue(e.target.value)
          }}
        />
        <button
          onClick={() =>{
            person.changeName(input.initialValue())
            input.setInitialValue('')
          }}
        >
            Update
        </button>
      </div>
      <RenderCount/>
    </div>
  )
}
