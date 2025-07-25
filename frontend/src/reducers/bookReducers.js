import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_MY_LIST_REQUEST,
  BOOK_MY_LIST_SUCCESS,
  BOOK_MY_LIST_FAIL,
  BOOK_MY_LIST_RESET,
} from '../constants/bookConstants';

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookDetailsReducer = (state = { book: { user: {} } }, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookUpdateReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_UPDATE_RESET:
      return { book: {} };
    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookMyListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_MY_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_MY_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_MY_LIST_RESET:
      return { books: [] };
    default:
      return state;
  }
};