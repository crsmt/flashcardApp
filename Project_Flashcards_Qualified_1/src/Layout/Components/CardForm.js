import { React, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { createCard, readCard, updateCard } from '../../utils/api';


function CardForm({formProps: { title, inputLabelOne, inputLabelTwo }, deck}) {
  const { url, params: { deckId: cardId } } = useRouteMatch();
  const [card, setCard] = useState({});
  
  useEffect(() => {
    const abortController = new AbortController();

    async function getCard() {
      try {
        const response = await readCard(cardId);
        setCard(response);
        setFormData({
          front: response.front,
          back: response.back
        })
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", cardId);
        } else {
          throw error;
        }
      }
    }

    if (url !== `/deck/${deck.id}/cards/new`){
      getCard();
    }

    return () => {
      abortController.abort();
    };
  }, [cardId, deck.id, url]);

  const initialFormState = {
    front: card.front ? card.front : "",
    back: card.back ? card.back : "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event, submitType) => {
    event.preventDefault();
    submitType === 'newCard'
      ? createCard(formData)
      : updateCard(formData);
  }

  return (
    <>
      <h3>
        <span>{deck.name}</span>: <span>{title}</span>
      </h3>
      <form className='form-group' onSubmit={submitHandler}>
        <div>
          <label>{inputLabelOne}
            <textarea 
            name='front'
            className='form-control'
            onChange={handleChange}
            defaultValue={ formData.front }>
            </textarea>
          </label>
        </div>
        <div>
          <label>{inputLabelTwo}
            <textarea 
            name='back'
            className='form-control'
            onChange={handleChange}
            defaultValue={ formData.back }>
            </textarea>
          </label>
        </div>
        <div>
          <button className='btn btn-secondary'>CXD</button>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}

export default CardForm;