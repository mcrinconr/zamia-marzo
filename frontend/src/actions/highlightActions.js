import Axios from 'axios';
import {
  HIGHLIGHT_CREATE_FAIL,
  HIGHLIGHT_CREATE_REQUEST,
  HIGHLIGHT_CREATE_SUCCESS,
  HIGHLIGHT_UPDATE_REQUEST,
  HIGHLIGHT_UPDATE_SUCCESS,
  HIGHLIGHT_UPDATE_FAIL,
  HIGHLIGHT_LIST_REQUEST,
  HIGHLIGHT_LIST_SUCCESS,
  HIGHLIGHT_LIST_FAIL,
  HIGHLIGHT_DELETE_REQUEST,
  HIGHLIGHT_DELETE_FAIL,
  HIGHLIGHT_DELETE_SUCCESS,
  HIGHLIGHT_DETAILS_REQUEST,
  HIGHLIGHT_DETAILS_FAIL,
  HIGHLIGHT_DETAILS_SUCCESS,
} from '../constants/highlightConstants';

export const listHighlights = () => async (dispatch, getState) => {
  dispatch({ type: HIGHLIGHT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      '/api/highlights'
    );
    dispatch({ type: HIGHLIGHT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HIGHLIGHT_LIST_FAIL, payload: error.message });
  }
};

export const createHighlight = () => async (dispatch, getState) => {
  dispatch({ type: HIGHLIGHT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/highlights',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: HIGHLIGHT_CREATE_SUCCESS,
      payload: data.highlight,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HIGHLIGHT_CREATE_FAIL, payload: message });
  }
};

export const detailsHighlight = (highlightId) => async (dispatch, getState) => {
  dispatch({ type: HIGHLIGHT_DETAILS_REQUEST, payload: highlightId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/highlights/${highlightId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: HIGHLIGHT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HIGHLIGHT_DETAILS_FAIL, payload: message });
  }
};

export const updateHighlight = (highlight) => async (dispatch, getState) => {
  dispatch({ type: HIGHLIGHT_UPDATE_REQUEST, payload: highlight });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/highlights/${highlight._id}`, highlight, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HIGHLIGHT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HIGHLIGHT_UPDATE_FAIL, error: message });
  }
};

export const deleteHighlight = (highlightId) => async (dispatch, getState) => {
  dispatch({ type: HIGHLIGHT_DELETE_REQUEST, payload: highlightId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/highlights/${highlightId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HIGHLIGHT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HIGHLIGHT_DELETE_FAIL, payload: message });
  }
};
