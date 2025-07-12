import React from 'react'
import ReactDOM from 'react-dom/client'
import MixedApp from './src/MixedApp'
import ObjectfulApp from './src/ObjectfulApp'
import PureStateApp from './src/PureStateApp'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    }}>
      <div style={{ flex: 1 }}>
        <MixedApp />
      </div>
      <div
        style={{
          width: '2px',
          backgroundColor: 'black',
          margin: '0 10px',
        }}
      />
      <div style={{ flex: 1 }}>
        <ObjectfulApp/>
      </div>
      <div
        style={{
          width: '2px',
          backgroundColor: 'black',
          margin: '0 10px',
        }}
      />
      <div style={{ flex: 1 }}>
        <PureStateApp/>
      </div>
    </div>,
)
