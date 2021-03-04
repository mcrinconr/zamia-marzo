import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;
  if(!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className="editar-textos" onSubmit={submitHandler}>
          <h3>Forma de pago</h3>
{/*        <div>
          <div>
            <input
              type="radio"
              id="PSE"
              value="PSE"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="PSE">PSE</label>
          </div>
        </div>*/}
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <button class="btn btn-warning btn-lg" type="submit">Continuar</button>
      </form>
    </div>
  );
}
