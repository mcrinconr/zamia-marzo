import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHighlight,
  deleteHighlight,
  listHighlights } from '../actions/highlightActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { HIGHLIGHT_CREATE_RESET,
  HIGHLIGHT_DELETE_RESET} from '../constants/highlightConstants';

export default function HighlightListScreen(props) {
  const highlightList = useSelector((state) => state.highlightList);
  const { loading, error, highlights } = highlightList;

  const highlightCreate = useSelector((state) => state.highlightCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    highlight: createdHighlight,
  } = highlightCreate;

  const highlightDelete = useSelector((state) => state.highlightDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = highlightDelete;

  const dispatch = useDispatch();
  useEffect(() => {

    if (successCreate) {
      dispatch({ type: HIGHLIGHT_CREATE_RESET });
    props.history.push(`/highlight/${createdHighlight._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: HIGHLIGHT_DELETE_RESET });
    }
    dispatch(listHighlights());
    }, [createdHighlight, dispatch, props.history, successCreate, successDelete]);

    const deleteHandler = (highlight) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteHighlight(highlight._id));
      }
  };
  const createHandler = () => {
    dispatch(createHighlight());
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
        <h3>EDITA LA PORTADA</h3>
        </div>
        <div className="col-6 mr-auto">
        <button type="button" className="btn btn-warning float-right" onClick={createHandler}>
          Crear producto
        </button>
        </div>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>TEXTO</th>
              <th>IMAGEN DE FONDO</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {highlights.map((highlight) => (
              <tr key={highlight._id}>
                <td>{highlight.title}</td>
                <td>{highlight.text}</td>
                <td>{highlight.image}</td>
                <td>
                <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/highlight/${highlight._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  </div>
                  <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() => deleteHandler(highlight)}
                  >
                    Delete
                  </button>
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
