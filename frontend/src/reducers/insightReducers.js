import {
  INSIGHT_UPDATE_REQUEST,
  INSIGHT_UPDATE_SUCCESS,
  INSIGHT_UPDATE_FAIL,
  INSIGHT_UPDATE_RESET,
  INSIGHT_LIST_REQUEST,
  INSIGHT_LIST_SUCCESS,
  INSIGHT_LIST_FAIL,
  INSIGHT_CREATE_REQUEST,
  INSIGHT_CREATE_SUCCESS,
  INSIGHT_CREATE_FAIL,
  INSIGHT_CREATE_RESET,
  INSIGHT_DELETE_REQUEST,
  INSIGHT_DELETE_SUCCESS,
  INSIGHT_DELETE_FAIL,
  INSIGHT_DELETE_RESET,
  INSIGHT_DETAILS_REQUEST,
  INSIGHT_DETAILS_SUCCESS,
  INSIGHT_DETAILS_FAIL,
} from '../constants/insightConstants';

export const insightListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case INSIGHT_LIST_REQUEST:
      return { loading: true };
    case INSIGHT_LIST_SUCCESS:
      return { loading: false, insights: action.payload };
    case INSIGHT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const insightCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSIGHT_CREATE_REQUEST:
      return { loading: true };
    case INSIGHT_CREATE_SUCCESS:
      return { loading: false, success: true, insight: action.payload };
    case INSIGHT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INSIGHT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const insightDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case INSIGHT_DETAILS_REQUEST:
      return { loading: true };
    case INSIGHT_DETAILS_SUCCESS:
      return { loading: false, insight: action.payload };
    case INSIGHT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const insightUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSIGHT_UPDATE_REQUEST:
      return { loading: true };
    case INSIGHT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case INSIGHT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INSIGHT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const insightDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INSIGHT_DELETE_REQUEST:
      return { loading: true };
    case INSIGHT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INSIGHT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case INSIGHT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
