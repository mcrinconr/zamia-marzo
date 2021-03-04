import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import Highlight from '../components/Highlight';
import Insight from '../components/Insight';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listHighlights } from '../actions/highlightActions';
import { listInsights } from '../actions/insightActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const highlightList = useSelector((state) => state.highlightList);
  const {
    loading: loadingHighlights,
    error:errorHighlights,
    highlights,
  } = highlightList;

  const insightList = useSelector((state) => state.insightList);
  const {
    loading: loadingInsights,
    error:errorInsights,
    insights,
  } = insightList;

  useEffect(() => {
    dispatch(listHighlights());
    dispatch(listProducts({}));
    dispatch(listInsights());
  }, [dispatch]);
  return (
    <div className="container-fluid">
      {loadingHighlights ? (
        <LoadingBox></LoadingBox>
      ) : errorHighlights ? (
        <MessageBox variant="danger">{errorHighlights}</MessageBox>
      ) : (
        <>
          {highlights.length === 0 && <MessageBox>No highlight Found</MessageBox>}

            {highlights.map((highlight) => (
              <Highlight key={highlight._id} highlight={highlight}></Highlight>
            ))}

        </>
      )}
      <div className="contenedor-productos">
      <h2>PRODUCTOS DESTACADOS</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>Producto No Encontrado</MessageBox>}
          <div className="container-fluid">
            <div className="row justify-content-around">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </div>
        </>
      )}
      </div>
      <div className="contenedor-insight">
      {loadingInsights ? (
        <LoadingBox></LoadingBox>
      ) : errorInsights ? (
        <MessageBox variant="danger">{errorInsights}</MessageBox>
      ) : (
        <>
          {insights.length === 0 && <MessageBox>No insight Found</MessageBox>}
            {insights.map((insight) => (
              <Insight key={insight._id} insight={insight}></Insight>
            ))}
        </>
      )}
    </div>
    </div>
  );
}
