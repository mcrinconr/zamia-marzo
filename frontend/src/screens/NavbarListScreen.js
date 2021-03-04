import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listNavbars } from '../actions/navbarActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function NavbarListScreen(props) {
  const navbarList = useSelector((state) => state.navbarList);
  const { loading, error, navbars } = navbarList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listNavbars());
    }, [ dispatch, props.history]);

  return (
    <div className="container">

      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NOMBRE DE TU EMPRESA</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {navbars.map((navbar) => (
              <tr key={navbar._id}>
                <td>{navbar.nombre}</td>
                <td>
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/navbar/${navbar._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
