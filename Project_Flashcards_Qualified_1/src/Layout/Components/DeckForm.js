import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { createDeck, readDeck, updateDeck } from '../../utils/api';


function DeckForm({formProps: { title, inputLabelOne, inputLabelTwo }}) {
  const { url, params: { deckId } } = useRouteMatch();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
        setFormData({
          name: response.name,
          description: response.description
        })
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }

    if (url !== '/decks/new') {
      getDeck();
    }

    return () => {
      abortController.abort();
    };
  }, [deckId, url])

  const initialFormState = {
    name: deck.name ? deck.name : "",
    description: deck.description ? deck.description : "",
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
    submitType === 'formDeck'
      ? createDeck(formData)
      : updateDeck(formData);
  }
  
  return (
    <>
      <h2>{title}</h2>
      <form className='form-group' onSubmit={submitHandler}>
        <div>
          <label>{inputLabelOne}
            <input name='name' className='form-control' type='text' 
            defaultValue={formData.name}
            onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>{inputLabelTwo}
            <textarea 
            name='description'
            className='form-control'
            defaultValue={formData.description}
            onChange={handleChange}></textarea>
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

export default DeckForm;