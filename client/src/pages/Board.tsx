import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];
const currentUsername = auth.getProfile()?.username;

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [filterUsername, setFilterUsername] = useState('');

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterUsername(event.target.value);
  };

  const filteredAndSortedTickets = (status: string) => {
    let filteredTickets = tickets.filter(ticket => ticket.status === status);

    // Apply filter by username
    if (filterUsername) {
      filteredTickets = filteredTickets.filter(ticket => ticket.assignedUser?.username === filterUsername);
    }

    // Sort tickets by username
    filteredTickets.sort((a, b) => (a.assignedUser?.username || '').localeCompare(b.assignedUser?.username || ''));

    return filteredTickets;
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Login to create & view tickets
          </h1>
        </div>  
      ) : (
          <div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create' >New Ticket</Link>
            </button>
            <div>
              <label htmlFor="filterUsername">Filter by Username: </label>
              <input
                type="text"
                id="filterUsername"
                value={filterUsername}
                onChange={handleFilterChange}
                placeholder="Enter username"
              />
              <button onClick={() => setFilterUsername(currentUsername || '')}>Show My Tickets</button>
            </div>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = filteredAndSortedTickets(status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </div>
        )
    }
    </>
  );
};

export default Board;
