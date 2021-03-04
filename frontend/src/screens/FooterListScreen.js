import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listFooters } from '../actions/footerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function FooterListScreen(props) {
  const footerList = useSelector((state) => state.footerList);
  const { loading, error, footers } = footerList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listFooters());
    }, [ dispatch, props.history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
        <h3>EDITA TU PIE DE PÁGINA</h3>
        </div>
      </div>

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
              <th>NOSOTROS</th>
              <th>ENLACES</th>
              <th>REDES SOCIALES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {footers.map((footer) => (
              <tr key={footer._id}>
                <td>{footer.nosotrosParrafo}</td>
                <td>{footer.enlace1}</td>
                <td>{footer.social1}</td>
                <td>
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/footer/${footer._id}/edit`)
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
