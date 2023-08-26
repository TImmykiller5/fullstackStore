import React from 'react'
import { useEffect } from 'react'

function Test() {
    useEffect(() => {
        console.log('yes')

  }, [])
  return (
    <div>test</div>
  )
}

export default Test