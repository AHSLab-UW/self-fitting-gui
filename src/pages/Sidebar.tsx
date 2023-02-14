import CollapsingSidebar from '../components/CollapsingSidebar';

import { useState } from 'react';
import '../styles/DragDrop.css';

type Props = {}

export default function DragDrop({}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div>
      <h1>Sidebar</h1>
      <CollapsingSidebar open={sidebarOpen} closeModal={toggleSidebar} />

      <button onClick={() => toggleSidebar()}>Toggle sidebar</button>
    </div>

  )
}