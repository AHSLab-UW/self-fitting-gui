import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/intro1">Intro 1</Link>
      <div></div>
      <Link to="/intro2">Intro 2</Link>
      <div></div>
      <Link to="/intro3">Intro 3</Link>
      <div></div>
      <Link to="/select">Select</Link>
      <div></div>
      <Link to="/fit">Fitting</Link>
      <div></div>
      <Link to="/adjust">Adjust</Link>
      <div></div>
      <Link to="/prompt">Prompt</Link>
      <div></div>
      <Link to="/finish">Finish</Link> 
    </div>
  )
}
