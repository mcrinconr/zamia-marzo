import Axios from 'axios';
import {
  FOOTER_UPDATE_REQUEST,
  FOOTER_UPDATE_SUCCESS,
  FOOTER_UPDATE_FAIL,
  FOOTER_LIST_REQUEST,
  FOOTER_LIST_SUCCESS,
  FOOTER_LIST_FAIL,
  FOOTER_DETAILS_REQUEST,
  FOOTER_DETAILS_FAIL,
  FOOTER_DETAILS_SUCCESS,
} from '../constants/footerConstants';

export const listFooters = () => async (dispatch, getState) => {
  dispatch({ type: FOOTER_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      '/api/footers'
    );
    dispatch({ type: FOOTER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOOTER_LIST_FAIL, payload: error.message });
  }
};

export const detailsFooter = (footerId) => async (dispatch, getState) => {
  dispatch({ type: FOOTER_DETAILS_REQUEST, payload: footerId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/footers/${footerId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: FOOTER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FOOTER_DETAILS_FAIL, payload: message });
  }
};

export const updateFooter = (footer) => async (dispatch, getState) => {
  dispatch({ type: FOOTER_UPDATE_REQUEST, payload: footer });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/footers/${footer._id}`, footer, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FOOTER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FOOTER_UPDATE_FAIL, error: message });
  }
};
