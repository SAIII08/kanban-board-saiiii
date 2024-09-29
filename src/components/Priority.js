import React, { useEffect, useState } from 'react';
import todo from '../assets/images/to do.png';
import Card from './Card';
import '../styles/Status.css';
import plusmore from '../assets/images/plusmore.png';
import nopriorityimg from '../assets/images/nopriority.png';
import urgentimg from '../assets/images/urgent.png';
import highimg from '../assets/images/high.png';
import mediumimg from '../assets/images/medium.png';
import lowimg from '../assets/images/low.png';

const Priority = ({ order }) => {
    const [tickets, setTickets] = useState([]);
    const [priorityGroups, setPriorityGroups] = useState({
        nopriority: [],
        lowpriority: [],
        mediumpriority: [],
        hightpriority: [],
        urgent: []
    });

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        groupTicketsByPriority();
    }, [tickets, order]);  // Including order here to trigger re-grouping when order changes

    const fetchTickets = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTickets(result.tickets);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const groupTicketsByPriority = () => {
        const grouped = {
            nopriority: [],
            lowpriority: [],
            mediumpriority: [],
            hightpriority: [],
            urgent: []
        };

        // Sort tickets based on the order prop
        const sortedTickets = [...tickets].sort((a, b) => {
            if (order === "Title") {
                return a.title.localeCompare(b.title);
            } else if (order === "Priority") {
                return b.priority - a.priority;
            }
            return 0;
        });

        // Group the sorted tickets by priority
        sortedTickets.forEach(ticket => {
            switch (ticket.priority) {
                case 0:
                    grouped.nopriority.push(ticket);
                    break;
                case 1:
                    grouped.lowpriority.push(ticket);
                    break;
                case 2:
                    grouped.mediumpriority.push(ticket);
                    break;
                case 3:
                    grouped.hightpriority.push(ticket);
                    break;
                case 4:
                    grouped.urgent.push(ticket);
                    break;
                default:
                    break;
            }
        });

        setPriorityGroups(grouped);
    };

    const renderPriorityGroup = (label, imgSrc, tickets) => (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={imgSrc} className='headingImg' alt='' />
                <p className='cText'>{label}</p>
                <p className='cText'>{tickets.length}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='' />
                </div>
            </div>
            <div className='Cards'>
                {tickets.map(ticket => (
                    <Card key={ticket.id} ticket={ticket} showUser={true} />
                ))}
            </div>
        </div>
    );

    return (
        <div className='Boards'>
            {renderPriorityGroup("No-Priority", nopriorityimg, priorityGroups.nopriority)}
            {renderPriorityGroup("Urgent", urgentimg, priorityGroups.urgent)}
            {renderPriorityGroup("High", highimg, priorityGroups.hightpriority)}
            {renderPriorityGroup("Medium", mediumimg, priorityGroups.mediumpriority)}
            {renderPriorityGroup("Low", lowimg, priorityGroups.lowpriority)}
        </div>
    );
};

export default Priority;
