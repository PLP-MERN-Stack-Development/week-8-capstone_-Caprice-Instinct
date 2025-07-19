import axios from 'axios';
import {
  EXCHANGE_CREATE_REQUEST,
  EXCHANGE_CREATE_SUCCESS,
  EXCHANGE_CREATE_FAIL,
  EXCHANGE_LIST_MY_REQUEST,
  EXCHANGE_LIST_MY_SUCCESS,
  EXCHANGE_LIST_MY_FAIL,
  EXCHANGE_DETAILS_REQUEST,
  EXCHANGE_DETAILS_SUCCESS,
  EXCHANGE_DETAILS_FAIL,
  EXCHANGE_UPDATE_STATUS_REQUEST,
  EXCHANGE_UPDATE_STATUS_SUCCESS,
  EXCHANGE_UPDATE_STATUS_FAIL,
  EXCHANGE_ADD_MESSAGE_REQUEST,
  EXCHANGE_ADD_MESSAGE_SUCCESS,
  EXCHANGE_ADD_MESSAGE_FAIL,
} from '../constants/exchangeConstants';

export const createExchange = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXCHANGE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/exchanges', { bookId }, config);

    dispatch({
      type: EXCHANGE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyExchanges = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXCHANGE_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/exchanges', config);

    dispatch({
      type: EXCHANGE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExchangeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXCHANGE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/exchanges/${id}`, config);

    dispatch({
      type: EXCHANGE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateExchangeStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXCHANGE_UPDATE_STATUS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/exchanges/${id}`, { status }, config);

    dispatch({
      type: EXCHANGE_UPDATE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_UPDATE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMessage = (id, content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXCHANGE_ADD_MESSAGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/exchanges/${id}/messages`,
      { content },
      config
    );

    dispatch({
      type: EXCHANGE_ADD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_ADD_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};