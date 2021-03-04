import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Password and confirm password are not a match')
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="editar-textos" onSubmit={submitHandler}>
          <h3>Crear cuenta</h3>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input className="form-control form-control-lg"
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control form-control-lg"
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

          <div class="form-group">
            <label htmlFor="confirmPassword">Confirma tu contraseña</label>
            <input class="form-control form-control-lg"
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <button type="button" className="btn btn-success">
          Regístrate
        </button>
        <div>
          Ya tienes una cuenta? <span />
          <button type="button" className="btn btn-primary">
          <Link to={`/signin?redirect=${redirect}`} className="link-letras-blancas">
            Inicia Sesión
          </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
