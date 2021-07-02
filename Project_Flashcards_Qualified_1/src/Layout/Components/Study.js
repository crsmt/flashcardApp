import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


function Card({ card }) {
  const { url } = useRouteMatch();

  return (
    <div className='container border border-secondary p-2 mt-2'>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link to={`${url}/cards/${card.id}/edit`} className='btn btn-secondary'>Edit</Link>
      <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></button>
    </div>
  );
}

export default Card;