import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Home() {
  const history = useLocation();
  return (
    <>
      <div>Home!!</div>
      <Link to="/drag-drop-demo">Drag Drop Demo</Link>
      <div></div>
      <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          command: { value: string };
        };
        fetch(`/device?command=${target.command.value}`)
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
      }}>
        <input type="text" name="command"/>
        <button type="submit">Send</button>
      </form>
    </>
  )
}
