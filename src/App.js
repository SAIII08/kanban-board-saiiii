import './styles/App.css';
import Navbar from './components/Navbar';
import Status from './components/Status';
import Priority from './components/Priority';
import Byuser from './components/Byuser';
import { useState, useEffect } from 'react';

function App() {
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'user');
  const [order, setOrder] = useState(() => localStorage.getItem('order') || 'Title');

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('order', order);
  }, [order]);

  const setGroupingValue = (newValue) => {
    if (['status', 'priority', 'user'].includes(newValue)) {
      setGrouping(newValue);
    } else {
      console.error('Invalid grouping value provided:', newValue);
    }
  };

  const setOrderingValue = (newValue) => {
    if (['Priority', 'Title'].includes(newValue)) {
      setOrder(newValue);
    } else {
      console.error('Invalid ordering value provided:', newValue);
    }
  };

  const renderContent = () => {
    switch (grouping) {
      case 'status':
        return <Status order={order} />;
      case 'priority':
        return <Priority order={order} />;
      default:
        return <Byuser order={order} />;
    }
  };

  return (
    <div className='fullBody'>
      <Navbar
        order={order}
        grouping={grouping}
        setGroupingValue={setGroupingValue}
        setOrderingValue={setOrderingValue}
      />
      {renderContent()}
    </div>
  );
}

export default App;
