/*import Dropdown from 'react-bootstrap/Dropdown';

function DropdownMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">function 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">funtion 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">function 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu; */

import React, { useState } from 'react';
import "../styles/DropDown.css";

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='dropdown'>
      <button className='dropdown-button' onClick={toggleDropdown}>Toggle Dropdown</button>
      {showDropdown && (
        <ul className='dropdown-ul'>
          <li className='dropdown-li'>Option 1</li>
          <li className='dropdown-li'>Option 2</li>
          <li className='dropdown-li'>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
