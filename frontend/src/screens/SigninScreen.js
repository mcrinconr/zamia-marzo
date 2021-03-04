import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="editar-textos" onSubmit={submitHandler}>
          <h3>Inicia Sesión</h3>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div class="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control"
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div class="form-group">
          <label htmlFor="password">Contraseña</label>
          <input class="form-control form-control-lg"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className="btn btn-warning btn-lg" type="submit">Actualizar</button>
        <div>
          Eres nuevo? <span />
          <button type="button" className="btn btn-success">
          <Link to={`/register?redirect=${redirect}`} className="link-letras-blancas">
            Create your account
          </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
