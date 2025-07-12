import { useRef } from 'react'
import React from 'react'

function RenderCount() {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div>
      <p>This component was rendered {renderCount.current}
        {renderCount.current === 1 ? ' time' : ' times'}.</p>
    </div>
  )
}

export default RenderCount
