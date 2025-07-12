import React, { useState } from 'react'
import RenderCount from './RenderCount'

function PureStateApp() {
  const [name, setName] = useState('Emilio')
  const [age, setAge] = useState(20)
  const [input, setInput] = useState('')

  const birthday = () => setAge((prev) => prev + 1)

  const handleUpdateName = () => {
    if (input.trim()) setName(input.trim())
    setInput('')
  }

  return (
    <div style={{ padding: 20, height: '100%' }}>
      <h1>Pure-State playground</h1>

      <div>
        <p>{name} is {age} years old</p>
        <button onClick={birthday}>Birthday 🎂</button>
      </div>

      <div >
        <p>Update name of {name}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleUpdateName}>Update</button>
      </div>

      <RenderCount />
    </div>
  )
}

export default PureStateApp
