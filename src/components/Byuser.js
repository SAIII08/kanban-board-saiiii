import React, { useEffect, useState } from 'react';
import '../styles/Status.css';
import Card from './Card.js';
import plusmore from '../assets/images/plusmore.png';
import availableimg from '../assets/images/availableimg.png';
import notavailableimg from '../assets/images/notavailableimg.png';

import usr1 from '../assets/images/usr-1.png';
import usr2 from '../assets/images/usr-2.png';
import usr3 from '../assets/images/usr-3.png';
import usr4 from '../assets/images/usr-4.png';
import usr5 from '../assets/images/usr-5.png';
import usr6 from '../assets/images/usr-6.png';
import usr7 from '../assets/images/usr-7.png';

const usrImageMap = {
    "usr-1": usr1,
    "usr-2": usr2,
    "usr-3": usr3,
    "usr-4": usr4,
    "usr-5": usr5,
    "usr-6": usr6,
    "usr-7": usr7,
};

const Byuser = ({ order }) => {
    const [tick, setTick] = useState([]);
    const [users, setUsers] = useState([]);
    const [usermass, setUsermass] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const result = await response.json();
                setTick(result.tickets);
                setUsers(result.users);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const masspre = users.map(user => {
            const userTickets = tick.filter(ticket => ticket.userId === user.id);

            // Sorting tickets based on the 'order' prop
            const sortedTickets = userTickets.sort((a, b) => {
                return order === "Title"
                    ? a.title.localeCompare(b.title)
                    : b.priority - a.priority;
            });

            return { user, tickets: sortedTickets };
        });

        setUsermass(masspre);
    }, [tick, users, order]);

    return (
        <div className='Boards'>
            {usermass.map(({ user, tickets }) => (
                <div key={user.id} className='Board'>
                    <div className='boardHeading'>
                        <img src={usrImageMap[user.id] || usr1} className='headingImg2' alt='' />
                        <p className='cText' style={{ width: "500px" }}>{user.name}</p>
                        <p className='cText'>{tickets.length}</p>
                        <img src={user.available ? availableimg : notavailableimg} className='dot' alt='' />
                        <div className='boardHeading' id='pluske'>
                            <img src={plusmore} className='headingImg' alt='' />
                        </div>
                    </div>

                    <div className='Cards'>
                        {tickets.map(ticket => (
                            <Card key={ticket.id} ticket={ticket} available={user.available} showUser={false} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Byuser;
