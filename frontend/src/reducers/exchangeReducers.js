import {
  EXCHANGE_CREATE_REQUEST,
  EXCHANGE_CREATE_SUCCESS,
  EXCHANGE_CREATE_FAIL,
  EXCHANGE_CREATE_RESET,
  EXCHANGE_LIST_MY_REQUEST,
  EXCHANGE_LIST_MY_SUCCESS,
  EXCHANGE_LIST_MY_FAIL,
  EXCHANGE_LIST_MY_RESET,
  EXCHANGE_DETAILS_REQUEST,
  EXCHANGE_DETAILS_SUCCESS,
  EXCHANGE_DETAILS_FAIL,
  EXCHANGE_UPDATE_STATUS_REQUEST,
  EXCHANGE_UPDATE_STATUS_SUCCESS,
  EXCHANGE_UPDATE_STATUS_FAIL,
  EXCHANGE_UPDATE_STATUS_RESET,
  EXCHANGE_ADD_MESSAGE_REQUEST,
  EXCHANGE_ADD_MESSAGE_SUCCESS,
  EXCHANGE_ADD_MESSAGE_FAIL,
  EXCHANGE_ADD_MESSAGE_RESET,
} from '../constants/exchangeConstants';

export const exchangeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXCHANGE_CREATE_REQUEST:
      return { loading: true };
    case EXCHANGE_CREATE_SUCCESS:
      return { loading: false, success: true, exchange: action.payload };
    case EXCHANGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EXCHANGE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const exchangeListMyReducer = (state = { exchanges: [] }, action) => {
  switch (action.type) {
    case EXCHANGE_LIST_MY_REQUEST:
      return { loading: true, exchanges: [] };
    case EXCHANGE_LIST_MY_SUCCESS:
      return { loading: false, exchanges: action.payload };
    case EXCHANGE_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case EXCHANGE_LIST_MY_RESET:
      return { exchanges: [] };
    default:
      return state;
  }
};

export const exchangeDetailsReducer = (
  state = { exchange: { messages: [] } },
  action
) => {
  switch (action.type) {
    case EXCHANGE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EXCHANGE_DETAILS_SUCCESS:
      return { loading: false, exchange: action.payload };
    case EXCHANGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const exchangeUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case EXCHANGE_UPDATE_STATUS_REQUEST:
      return { loading: true };
    case EXCHANGE_UPDATE_STATUS_SUCCESS:
      return { loading: false, success: true };
    case EXCHANGE_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case EXCHANGE_UPDATE_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const exchangeAddMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case EXCHANGE_ADD_MESSAGE_REQUEST:
      return { loading: true };
    case EXCHANGE_ADD_MESSAGE_SUCCESS:
      return { loading: false, success: true, exchange: action.payload };
    case EXCHANGE_ADD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case EXCHANGE_ADD_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
};