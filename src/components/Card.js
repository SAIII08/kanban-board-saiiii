import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import tag from '../assets/images/tag.png';
import img0 from '../assets/images/nopriority.png';
import img4 from '../assets/images/urgent.png';
import img3 from '../assets/images/high.png';
import img2 from '../assets/images/medium.png';
import img1 from '../assets/images/low.png';
import done from '../assets/images/Done.png';
import Cancelled from '../assets/images/canceled.png';
import backlogimg from '../assets/images/backlog.png';
import inprogressimg from '../assets/images/in progress.png';
import todo from '../assets/images/to do.png';
import usr1 from '../assets/images/usr-1.png';
import usr2 from '../assets/images/usr-2.png';
import usr3 from '../assets/images/usr-3.png';
import usr4 from '../assets/images/usr-4.png';
import usr5 from '../assets/images/usr-5.png';
import usr6 from '../assets/images/usr-6.png';
import usr7 from '../assets/images/usr-7.png';

const Card = ({ ticket, showUser = true }) => {
    const [available, setAvailable] = useState(false);
    const [users, setUsers] = useState([]);

    const priorityImageMap = [img0, img1, img2, img3, img4];
    const statusImageMap = {
        "Todo": todo,
        "In progress": inprogressimg,
        "Backlog": backlogimg,
        "Done": done,
        "Cancelled": Cancelled,
    };
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const result = await response.json();
                setUsers(result.users);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (ticket) {
            const user = users.find(user => user.id === ticket.userId);
            if (user) {
                setAvailable(user.available);
            }
        }
    }, [users, ticket]);

    const usrImage = usrImageMap[ticket.userId] || usr1;
    const imgSrc = priorityImageMap[ticket.priority] || img0;
    const statusImgSrc = statusImageMap[ticket.status] || todo;

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <span className='cardId'>{ticket.id}</span>
                    <span className='cardTitle'>
                        {showUser && <img src={statusImgSrc} alt='' />} {ticket.title}
                    </span>
                </div>
                {showUser && (
                    <div style={{ height: "38px" }}>
                        <img className='userImg' src={usrImage} alt='' />
                        <div className={available ? 'availableUser' : 'notavailableUser'} />
                    </div>
                )}
            </div>
            <div className='lowerBox'>
                {showUser && (
                    <div className='priorityBox'>
                        <img className='priorityImg' src={imgSrc} alt='priority' />
                    </div>
                )}
                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='tag' />
                    <span className='tagText'>{ticket.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
