import { Link } from 'react-router-dom'
import shenImg from "../assets/imgs/shen.jpg"
import logoImg from "../assets/imgs/logo.jpg"
import Button from '../components/Button'

import '../styles/Home.css'
import ProgressBar from '../components/ProgressBar'

export default function Home() {
  const test = ["Jason", "is", "very", "awesome"];

  return (
    <>
      <div>Home!</div>
      <img className="shen" src={shenImg} alt="shen" />
      <img className="logo" src={logoImg} alt="logo" />
      <div></div>
      <Link to="/welcome">Welcome</Link>
      <div></div>
      <Link to="/drag-drop-demo">Drag Drop Demo</Link>
      <div></div>
      <Link to="/dev">Command Demo</Link>
      <div></div>
      <Link to="/VideoPage">Video Page</Link>
      
      {test.map((item) => {
          return <> 
            <Button title={item} />
          </>;
        })}
        < ProgressBar />

    </>
  )
}
