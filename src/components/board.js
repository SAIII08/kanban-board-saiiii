const Board = ({ order }) => {
    const [tickets, setTickets] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        todo: 0,
        inProgress: 0,
        done: 0,
        cancelled: 0,
        backlog: 0
    });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const result = await response.json();
                setTickets(result.tickets);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, []);

    useEffect(() => {
        const counts = { todo: 0, inProgress: 0, done: 0, cancelled: 0, backlog: 0 };
        tickets.forEach(ticket => {
            if (ticket.status === "Todo") counts.todo++;
            else if (ticket.status === "In Progress") counts.inProgress++;
            else if (ticket.status === "Done") counts.done++;
            else if (ticket.status === "cancelled") counts.cancelled++;
            else if (ticket.status === "backlog") counts.backlog++;
        });
        setStatusCounts(counts);
    }, [tickets]);

    const sortTickets = (tickets, order) => {
        return [...tickets].sort((a, b) => {
            if (order === "Priority") {
                return a.priority - b.priority;
            } else if (order === "Title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const sortedTickets = sortTickets(tickets, order);

    return (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={nopriorityimg} className='headingImg' alt='' />
                <p className='cText' style={{ width: "190px" }}>No-Priority</p>
                <p className='cText'>{statusCounts.backlog}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='' />
                </div>
            </div>

            <div className='Cards'>
                {sortedTickets.map(ticket => (
                    ticket.priority === 0 && <Card key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};
