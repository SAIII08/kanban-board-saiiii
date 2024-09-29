import React, { useState, useEffect } from 'react';
import '../styles/Status.css';
import '../styles/Dropdown.css';

function Dropdown({ setGroupingValue, setOrderingValue }) {
  const [selectedValue, setSelectedValue] = useState(() => localStorage.getItem('grouping') || 'status');
  const [selectedValueOrder, setSelectedValueOrder] = useState(() => localStorage.getItem('order') || 'Priority');

  useEffect(() => {
    localStorage.setItem('grouping', selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    localStorage.setItem('order', selectedValueOrder);
  }, [selectedValueOrder]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setGroupingValue(value);
  };

  const handleSelectChangeOrder = (event) => {
    const value = event.target.value;
    setSelectedValueOrder(value);
    setOrderingValue(value);
  };

  return (
    <div className='dropdown'>
      <ul>
        <li>
          Grouping
          <select name="grouping" value={selectedValue} onChange={handleSelectChange}>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            <option value="user">User</option>
          </select>
        </li>
      </ul>
      <ul>
        <li>
          Ordering
          <select name="ordering" value={selectedValueOrder} onChange={handleSelectChangeOrder}>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
