import {
  HIGHLIGHT_UPDATE_REQUEST,
  HIGHLIGHT_UPDATE_SUCCESS,
  HIGHLIGHT_UPDATE_FAIL,
  HIGHLIGHT_UPDATE_RESET,
  HIGHLIGHT_LIST_REQUEST,
  HIGHLIGHT_LIST_SUCCESS,
  HIGHLIGHT_LIST_FAIL,
  HIGHLIGHT_CREATE_REQUEST,
  HIGHLIGHT_CREATE_SUCCESS,
  HIGHLIGHT_CREATE_FAIL,
  HIGHLIGHT_CREATE_RESET,
  HIGHLIGHT_DELETE_REQUEST,
  HIGHLIGHT_DELETE_SUCCESS,
  HIGHLIGHT_DELETE_FAIL,
  HIGHLIGHT_DELETE_RESET,
  HIGHLIGHT_DETAILS_REQUEST,
  HIGHLIGHT_DETAILS_SUCCESS,
  HIGHLIGHT_DETAILS_FAIL,
} from '../constants/highlightConstants';

export const highlightListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case HIGHLIGHT_LIST_REQUEST:
      return { loading: true };
    case HIGHLIGHT_LIST_SUCCESS:
      return { loading: false, highlights: action.payload };
    case HIGHLIGHT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const highlightCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HIGHLIGHT_CREATE_REQUEST:
      return { loading: true };
    case HIGHLIGHT_CREATE_SUCCESS:
      return { loading: false, success: true, highlight: action.payload };
    case HIGHLIGHT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HIGHLIGHT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const highlightDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case HIGHLIGHT_DETAILS_REQUEST:
      return { loading: true };
    case HIGHLIGHT_DETAILS_SUCCESS:
      return { loading: false, highlight: action.payload };
    case HIGHLIGHT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const highlightUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HIGHLIGHT_UPDATE_REQUEST:
      return { loading: true };
    case HIGHLIGHT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case HIGHLIGHT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case HIGHLIGHT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const highlightDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HIGHLIGHT_DELETE_REQUEST:
      return { loading: true };
    case HIGHLIGHT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HIGHLIGHT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case HIGHLIGHT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
