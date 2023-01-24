import { useState } from 'react';
import '../styles/DragDrop.css';

type Props = {}

export default function DragDrop({}: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Drag Drop Demo</h1>
      <h3>{count}</h3>

      <button onClick={() => setCount(count + 1)}>Add Count</button>
    </div>

  )
}