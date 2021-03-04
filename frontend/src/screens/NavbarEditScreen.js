import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsNavbar, updateNavbar } from '../actions/navbarActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { NAVBAR_UPDATE_RESET } from '../constants/navbarConstants';

export default function NavbarEditScreen(props) {
  const navbarId = props.match.params.id;
  const [nombre, setNombre] = useState('');

  const navbarDetails = useSelector((state) => state.navbarDetails);
  const { loading, error, navbar } = navbarDetails;

  const navbarUpdate = useSelector((state) => state.navbarUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = navbarUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/navbarlist');
    }
    if (!navbar || navbar._id !== navbarId || successUpdate) {
      dispatch({ type: NAVBAR_UPDATE_RESET });
      dispatch(detailsNavbar(navbarId));
    } else {
      setNombre(navbar.nombre);
    }
  }, [navbar, dispatch, navbarId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update navbar
    dispatch(
      updateNavbar({
        _id: navbarId,
        nombre,
      })
    );
  };

  return (
    <div>
    <form className="editar-textos" onSubmit={submitHandler}>
        <h3>Edita el nombre de tu empresa</h3>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <label for="exampleFormControlTextarea1">Nombre</label>
            <div class="form-row">
              <div class="col-5">
                <input class="form-control form-control-lg"
                  id="nombres"
                  type="text"
                  placeholder="Enter nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  ></input>
                </div>
              </div>
            <button class="btn btn-warning btn-lg" type="submit">Actualizar</button>
          </>
        )}
      </form>
    </div>
  );
}
