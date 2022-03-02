import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const url = 'https://react-hooks-updates-1e201-default-rtdb.firebaseio.com/ingredients.json';
  const { onLoadedIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()
  // const [userInput, SetUserInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length !== 0 ? `?orderBy="title"&equalTo="${enteredFilter}"` : '';
        fetch(url + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            console.log(loadedIngredients);
            onLoadedIngredients(loadedIngredients);
          });
      }
      return () => {
        clearTimeout(timer);
      }
    }, 500)
  }, [enteredFilter, inputRef, onLoadedIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={event => {
              setEnteredFilter(event.target.value);
            }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
