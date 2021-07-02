import { React, useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';

function StudyCard({ deck }) {
  const [card, setCard] = useState(deck.cards[0]);
  const [cardPosition, setCardPosition] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const history = useHistory();
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);

    if (cardPosition + 1 < deck.cards.length) {
      setCardPosition(cardPosition + 1);
      setCard(deck.cards[cardPosition]);
    } else {
      if (window.confirm('Would you like to start the deck over?')) {
        setCardPosition(0);
        setCard(cardPosition);
      } else {
        history.push('/')
      }
    }
  };

  return (
    <div className='container border border-secondary p-2 mt-2'>
    { deck && (deck.cards.length < 3) 
      ?
      <div>
        <h4>Not enough cards.</h4>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck</p>
        <Link to={`/decks/${deck.id}/cards/new`} className='btn btn-primary'>Add Cards</Link>
      </div> 
      :
      <div className='border-rounded'>
        <h2>Card {cardPosition + 1} of {deck.cards.length}</h2>
        { !isFlipped ? <p>{card.front}</p> : <p>{card.back}</p>}
        <button className='btn btn-secondary' onClick={handleFlip}>Flip</button>
        { isFlipped && <button className='btn btn-primary' onClick={handleNext}>Next</button>}
      </div>
    }
    </div>
  )
}


export default StudyCard;