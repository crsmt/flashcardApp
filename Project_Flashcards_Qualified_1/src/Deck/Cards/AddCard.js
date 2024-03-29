import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import CardForm from './CardForm';
import { readDeck, createCard } from '../../utils/api/index';

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  const initialFormState = {
    front: '',
    back: '',
    deckId,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    async function loadData() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Ignore `AbortError`
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', formData);
    async function updateData() {
      try {
        await createCard(deckId, formData);
        setFormData(initialFormState);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Ignore `AbortError`
          console.log('Aborted');
        } else throw error;
      }
    }
    updateData();
  };

  if (deck) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">
                {' '}
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" key="1">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="2">
              Add Card
            </li>
          </ol>
        </nav>
        <br />
        <h2>{deck.name}: Add Card</h2>
        <form onSubmit={handleSubmit}>
          <CardForm formData={formData} handleChange={handleChange} />
          <Link to={`/decks/${deckId}`} className="btn btn-secondary">
            Done
          </Link>{' '}
          &nbsp;
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
  return 'Loading...';
}
export default AddCard;