import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from "react-router-dom";
import {createOrder} from '../actions/orderActions';
import {ORDER_CREATE_RESET} from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if(!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  };
  useEffect(() => {
    if(success) {
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET});
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="container">
              <div className="row">
                <div className="card card-body-product border rounded">
                  <h3>Datos de envío</h3>
                  <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="card card-body-product border rounded">
                  <h3>Método de pago</h3>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="card card-body-product border rounded card-li">
                  <h3>Pedido</h3>
                  <ul>
                    {cart.cartItems.map((item) => (
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
                <div className="ml-auto">${cart.itemsPrice.toFixed(2)}</div>
              </div>
              <div className="d-flex">
                <div className="">Costo de envío</div>
                <div className="ml-auto">${cart.shippingPrice.toFixed(2)}</div>
              </div>
              <div className="d-flex">
                <div className="">Impuesto</div>
                <div className="ml-auto">${cart.taxPrice.toFixed(2)}</div>
              </div>
              <div className="d-flex">
                <div className="">
                  <strong>Total</strong>
                </div>
                <div className="ml-auto">
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <label />
                <button
                type="button"
                className="btn btn-warning"
                 onClick={placeOrderHandler}
                 disabled={cart.cartItems.length === 0}
                 >
                Enviar Pedido
                </button>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
