import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div className="container">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Volver</Link>
          <div className="row contenedor-producto">
            <div className="col-lg-6">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-lg-3">
              <ul>
                <li>
                  <h3>{product.name}</h3>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  Descripción:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-xl-3">
              <div className="container card card-body-product border rounded">
                  <div className="row">
                      <div className="col-6">Precio</div>
                      <div className="col-6">${product.price}</div>
                  </div>
                    <div className="row">
                      <div className="col-6">Estado</div>
                      <div className="col-6">
                        {product.countInStock > 0 ? (
                          <span className="success">Disponible</span>
                        ) : (
                          <span className="danger">NO Disponible</span>
                        )}
                      </div>
                    </div>
                  {product.countInStock > 0 && (
                    <>
                        <div className="row">
                          <div className="col-6">Cantidad</div>
                          <div className="col-6">
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                        <button
                          onClick={addToCartHandler}
                          className="btn btn-warning"
                        >
                          Añadir al Carrito
                        </button>
                    </>
                  )}
              </div>
            </div>
          </div>
          <div>
            <h3 id="reviews">Reseñas</h3>
            {product.reviews.length === 0 && (
              <MessageBox>No hay reseñas</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
                {userInfo ? (
                  <form onSubmit={submitHandler} id="reseña">
                  <h3>Escribe una reseña</h3>
                    <div className="container">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label" htmlFor="rating">Rating</label>
                      <select
                        className="form-control col-sm-2"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Malo</option>
                        <option value="2">2- Regular</option>
                        <option value="3">3- Bueno</option>
                        <option value="4">4- Muy Bueno</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="comment">Comentar</label>
                      <textarea class="form-control"
                        rows="3"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="btn btn-success" type="submit">
                        Enviar
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Por favor <Link to="/signin">Inicia Sesión</Link> para escribir una reseña
                  </MessageBox>
                )}
          </div>
        </div>
      )}
    </div>
  );
}
