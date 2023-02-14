import React, { useState } from 'react';
import "./CollapsingSidebar.css";
import closeIcon from '../assets/imgs/close.png'

interface Props {
    open: boolean,
    closeModal: Function
}

const CollapsingSidebar = (props: Props) => {
  let className = "sidebar"
  if (props.open) {
    className += " open"
  }

  return (
    <div className={className}>
        <div className="sidebar-header">
            {/* Text on left, close icon on right */}
            <div className="space-between">
                <h2>Collapsing Sidebar</h2>
                <img src={closeIcon} alt="Close sidebar" className='icon' onClick={() => props.closeModal()} />
            </div>
        </div>
        <div className="sidebar-body">
            {/* Body stuff goes here */}
            <button>Button 1</button>
            <div></div>
            <button>Button 2</button>
            <div></div>
            <button>Button 3</button>
            <div></div>
        </div>
        <div className="sidebar-footer">
            {/* Footer stuff goes here */}
        </div>
    </div>
  );
};

export default CollapsingSidebar;
