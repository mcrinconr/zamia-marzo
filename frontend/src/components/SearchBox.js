import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
        <button className="border-left border-top border-bottom border-secondary" type="submit">
        < span/>
          <i className="fa fa-search"></i>
        </button>
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
          className="border-right border-top border-bottom border-secondary"
        ></input>

    </form>
  );
}
