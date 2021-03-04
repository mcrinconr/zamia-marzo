import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <h3>Order {order._id}</h3>
      <div className="row">
        <div className="col-lg-8">
          <div className="container">
            <div className="row">
              <div className="card card-body-product border rounded">
                <h3>Datos de envío</h3>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">No enviado</MessageBox>
                )}
              </div>
            </div>
            <div className="row">
              <div className="card card-body-product border rounded">
                <h3>Método de pago</h3>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Pago realizado {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Sin pagar</MessageBox>
                )}
              </div>
            </div>
            <div className="row">
              <div className="card card-body-product border rounded card-li">
                <h3>Pedido</h3>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="d-flex justify-content-between seleccionar-imagen">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small my-auto"
                          ></img>
                        </div>
                        <div className="my-auto">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="my-auto">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
        <div className="container card card-body-product border rounded">
          <h3>Resumen del pedido</h3>
            <div className="d-flex">
              <div className="">Items</div>
              <div className="ml-auto">${order.itemsPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex">
              <div className="">Costo de envío</div>
              <div className="ml-auto">${order.shippingPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex">
              <div className="">Impuesto</div>
              <div className="ml-auto">${order.taxPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex">
              <div className="">
                <strong>Total</strong>
              </div>
              <div className="ml-auto">
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
              {!order.isPaid && (
                <div>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </div>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    onClick={deliverHandler}
                  >
                    Enviar Pedido
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
