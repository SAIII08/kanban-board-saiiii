import React, { useEffect, useRef, useState } from 'react';
import '../styles/Status.css';
import optionsimg from '../assets/images/options.png';
import Dropdown from './Dropdown.js';
import '../styles/Dropdown.css';
import dropdownimg from '../assets/images/dropdown.png';

function Navbar({ order, grouping, setGroupingValue, setOrderingValue }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const closeDropdown = (event) => {
    if (isDropdownOpen && dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, [isDropdownOpen]);

  return (
    <div className='randombar'>
      <div className='topBar' onClick={toggleDropdown}>
        <img src={optionsimg} className='optionsImg' alt='' />
        <button className='button'>Display</button>
        <img src={dropdownimg} className='optionsImg2' alt='' />
      </div>
      {isDropdownOpen && (
        <div ref={dropdownButtonRef}>
          <Dropdown
            order={order}
            grouping={grouping}
            setGroupingValue={setGroupingValue}
            setOrderingValue={setOrderingValue}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
