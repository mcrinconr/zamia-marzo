import Axios from 'axios';
import {
  INSIGHT_CREATE_FAIL,
  INSIGHT_CREATE_REQUEST,
  INSIGHT_CREATE_SUCCESS,
  INSIGHT_UPDATE_REQUEST,
  INSIGHT_UPDATE_SUCCESS,
  INSIGHT_UPDATE_FAIL,
  INSIGHT_LIST_REQUEST,
  INSIGHT_LIST_SUCCESS,
  INSIGHT_LIST_FAIL,
  INSIGHT_DELETE_REQUEST,
  INSIGHT_DELETE_FAIL,
  INSIGHT_DELETE_SUCCESS,
  INSIGHT_DETAILS_REQUEST,
  INSIGHT_DETAILS_FAIL,
  INSIGHT_DETAILS_SUCCESS,
} from '../constants/insightConstants';

export const listInsights = () => async (dispatch, getState) => {
  dispatch({ type: INSIGHT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      '/api/insights'
    );
    dispatch({ type: INSIGHT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: INSIGHT_LIST_FAIL, payload: error.message });
  }
};

export const createInsight = () => async (dispatch, getState) => {
  dispatch({ type: INSIGHT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/insights',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: INSIGHT_CREATE_SUCCESS,
      payload: data.insight,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INSIGHT_CREATE_FAIL, payload: message });
  }
};

export const detailsInsight = (insightId) => async (dispatch, getState) => {
  dispatch({ type: INSIGHT_DETAILS_REQUEST, payload: insightId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/insights/${insightId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: INSIGHT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INSIGHT_DETAILS_FAIL, payload: message });
  }
};

export const updateInsight = (insight) => async (dispatch, getState) => {
  dispatch({ type: INSIGHT_UPDATE_REQUEST, payload: insight });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/insights/${insight._id}`, insight, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INSIGHT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INSIGHT_UPDATE_FAIL, error: message });
  }
};

export const deleteInsight = (insightId) => async (dispatch, getState) => {
  dispatch({ type: INSIGHT_DELETE_REQUEST, payload: insightId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/insights/${insightId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INSIGHT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INSIGHT_DELETE_FAIL, payload: message });
  }
};
