import React, { useEffect, useMemo, useState } from 'react';
import todo from '../assets/images/to do.png';
import '../styles/Status.css';
import plusmore from '../assets/images/plusmore.png';
import done from '../assets/images/Done.png';
import Cancelled from '../assets/images/canceled.png';
import backlogimg from '../assets/images/backlog.png';
import inprogressimg from '../assets/images/in progress.png';
import Card from './Card';

const Status = ({ order }) => {
    const [tick, setTick] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const { tickets, users } = await response.json();
                setTick(tickets);
                setUsers(users);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    const categorizedTickets = useMemo(() => {
        return tick.reduce((acc, ticket) => {
            const user = users.find(user => user.id === ticket.userId);
            const available = user ? user.available : false;
            acc[ticket.status] = acc[ticket.status] || [];
            acc[ticket.status].push({ ...ticket, available });
            return acc;
        }, {});
    }, [tick, users]);

    const sortedTickets = (tickets) => {
        return order === "Title"
            ? [...tickets].sort((a, b) => a.title.localeCompare(b.title))
            : [...tickets].sort((a, b) => parseInt(b.priority) - parseInt(a.priority));
    };

    return (
        <div className='Boards'>
            {["Backlog", "Todo", "In progress", "Done", "Cancelled"].map(status => (
                <div className='Board' key={status}>
                    <div className='boardHeading'>
                        <img
                            src={status === "Backlog" ? backlogimg : status === "Todo" ? todo : status === "In progress" ? inprogressimg : status === "Done" ? done : Cancelled}
                            className='headingImg'
                            alt=''
                        />
                        <p className='cText'>{status}</p>
                        <p className='cText'>{(categorizedTickets[status] || []).length}</p>
                        <div className='boardHeading' id='pluske'>
                            <img src={plusmore} className='headingImg' alt='' />
                        </div>
                    </div>
                    <div className='Cards'>
                        {(categorizedTickets[status] || []).length > 0 && sortedTickets(categorizedTickets[status]).map(ticket => (
                            <Card key={ticket.id} ticket={ticket} available={ticket.available} showUser={true} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Status;
