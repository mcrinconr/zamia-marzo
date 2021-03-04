import {
  NAVBAR_UPDATE_REQUEST,
  NAVBAR_UPDATE_SUCCESS,
  NAVBAR_UPDATE_FAIL,
  NAVBAR_UPDATE_RESET,
  NAVBAR_LIST_REQUEST,
  NAVBAR_LIST_SUCCESS,
  NAVBAR_LIST_FAIL,
  NAVBAR_DETAILS_REQUEST,
  NAVBAR_DETAILS_SUCCESS,
  NAVBAR_DETAILS_FAIL,
} from '../constants/navbarConstants';

export const navbarListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case NAVBAR_LIST_REQUEST:
      return { loading: true };
    case NAVBAR_LIST_SUCCESS:
      return { loading: false, navbars: action.payload };
    case NAVBAR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const navbarDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case NAVBAR_DETAILS_REQUEST:
      return { loading: true };
    case NAVBAR_DETAILS_SUCCESS:
      return { loading: false, navbar: action.payload };
    case NAVBAR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const navbarUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NAVBAR_UPDATE_REQUEST:
      return { loading: true };
    case NAVBAR_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case NAVBAR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case NAVBAR_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
