import {
  FOOTER_UPDATE_REQUEST,
  FOOTER_UPDATE_SUCCESS,
  FOOTER_UPDATE_FAIL,
  FOOTER_UPDATE_RESET,
  FOOTER_LIST_REQUEST,
  FOOTER_LIST_SUCCESS,
  FOOTER_LIST_FAIL,
  FOOTER_DETAILS_REQUEST,
  FOOTER_DETAILS_SUCCESS,
  FOOTER_DETAILS_FAIL,
} from '../constants/footerConstants';

export const footerListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FOOTER_LIST_REQUEST:
      return { loading: true };
    case FOOTER_LIST_SUCCESS:
      return { loading: false, footers: action.payload };
    case FOOTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const footerDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FOOTER_DETAILS_REQUEST:
      return { loading: true };
    case FOOTER_DETAILS_SUCCESS:
      return { loading: false, footer: action.payload };
    case FOOTER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const footerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOTER_UPDATE_REQUEST:
      return { loading: true };
    case FOOTER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FOOTER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FOOTER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
