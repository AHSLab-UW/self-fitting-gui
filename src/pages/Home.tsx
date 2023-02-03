import { Link } from 'react-router-dom'
import shenImg from "../assets/imgs/shen.jpeg"
import Button from '../components/Button'

import '../styles/Home.css'

export default function Home() {
  const test = ["Jason", "is", "very", "awesome"];

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
      
      {test.map((item) => {
          return <> 
            <Button title={item} />
          </>;
        })}

    </>
  )
}
