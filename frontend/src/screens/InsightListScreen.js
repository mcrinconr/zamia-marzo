import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInsight,
  deleteInsight,
  listInsights } from '../actions/insightActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INSIGHT_CREATE_RESET,
  INSIGHT_DELETE_RESET } from '../constants/insightConstants';

export default function InsightListScreen(props) {
  const insightList = useSelector((state) => state.insightList);
  const { loading, error, insights } = insightList;

  const insightCreate = useSelector((state) => state.insightCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    insight: createdInsight,
  } = insightCreate;

    const insightDelete = useSelector((state) => state.insightDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = insightDelete;

  const dispatch = useDispatch();
  useEffect(() => {

  if (successCreate) {
    dispatch({ type: INSIGHT_CREATE_RESET });
  props.history.push(`/insight/${createdInsight._id}/edit`);
  }
  if (successDelete) {
    dispatch({ type: INSIGHT_DELETE_RESET });
  }
    dispatch(listInsights());
    }, [createdInsight, dispatch, props.history, successCreate, successDelete]);

    const deleteHandler = (insight) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteInsight(insight._id));
      }
  };
  const createHandler = () => {
  dispatch(createInsight());
};
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
        <h3>EDITA TU POST ESPECIAL</h3>
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
              <th>IMAGEN DE FONDO</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((insight) => (
              <tr key={insight._id}>
                <td>{insight.title}</td>
                <td>{insight.image}</td>
                <td>
                <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/insight/${insight._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  </div>
                  <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() => deleteHandler(insight)}
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
