import React from 'react';
import Card from './Card';

function CardList({ cards = [] }) {
  const cardList = cards.map((card) => (
    <Card key={card.id} card={card} />
  ));
  
    return (
    <>
      <div>{ cardList }</div>
    </>
  );
}

export default CardList;