import React from 'react';

export default function Highlight(props) {
  const {highlight} = props;
  return (
    <div key={highlight._id} className="highlight">
      <img className="imagen-principal" src={highlight.image} alt={highlight.title} />
      <div className="highlight-text">
        <h1>{highlight.title}</h1>
        <h2>{highlight.text}</h2>
      </div>
    </div>
  )
}
