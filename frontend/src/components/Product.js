import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const {product} = props;
  return (
    <div key={product._id} className="real-card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
        <h3>{product.name}</h3>
        </Link>
        <h3 className="price">${product.price}</h3>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
      </div>
    </div>
  )
}
