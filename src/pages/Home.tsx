import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Link to="/drag-drop-demo">Drag Drop Demo</Link>
    </>
  )
}
