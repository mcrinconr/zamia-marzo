import Axios from 'axios';
import {
  NAVBAR_UPDATE_REQUEST,
  NAVBAR_UPDATE_SUCCESS,
  NAVBAR_UPDATE_FAIL,
  NAVBAR_LIST_REQUEST,
  NAVBAR_LIST_SUCCESS,
  NAVBAR_LIST_FAIL,
  NAVBAR_DETAILS_REQUEST,
  NAVBAR_DETAILS_FAIL,
  NAVBAR_DETAILS_SUCCESS,
} from '../constants/navbarConstants';

export const listNavbars = () => async (dispatch, getState) => {
  dispatch({ type: NAVBAR_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      '/api/navbars'
    );
    dispatch({ type: NAVBAR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NAVBAR_LIST_FAIL, payload: error.message });
  }
};

export const detailsNavbar = (navbarId) => async (dispatch, getState) => {
  dispatch({ type: NAVBAR_DETAILS_REQUEST, payload: navbarId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/navbars/${navbarId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: NAVBAR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: NAVBAR_DETAILS_FAIL, payload: message });
  }
};

export const updateNavbar = (navbar) => async (dispatch, getState) => {
  dispatch({ type: NAVBAR_UPDATE_REQUEST, payload: navbar });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/navbars/${navbar._id}`, navbar, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: NAVBAR_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: NAVBAR_UPDATE_FAIL, error: message });
  }
};
