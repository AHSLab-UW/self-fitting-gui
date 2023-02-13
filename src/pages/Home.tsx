import { Link } from 'react-router-dom'
import shenImg from "../assets/imgs/shen.jpeg"

import '../styles/Home.css'

export default function Home() {
  return (
    <>
      <div>Home!</div>
      <img className="shen" src={shenImg} alt="shen" />

      <div></div>
      <Link to="/welcome">Welcome</Link>
      <div></div>
      <Link to="/drag-drop-demo">Drag Drop Demo</Link>
      <div></div>
      <Link to="/dev">Command Demo</Link>
      <div></div>
      <Link to="/VideoPage">Video Page</Link>
      <div></div>
      <Link to="/progress">Progress Bar Demo</Link>
      <div></div>
      <Link to="/dropdown">drop down menu</Link>
    </>
  )
}
