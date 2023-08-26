import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_CREATE_REVIEW_FAIL,
  PRODUCTS_CREATE_REVIEW_REQUEST,
  PRODUCTS_CREATE_REVIEW_SUCCESS,
  PRODUCTS_TOP_FAIL,
  PRODUCTS_TOP_REQUEST,
  PRODUCTS_TOP_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await axios.get(`/api/products/${keyword}`);
    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const topProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_TOP_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({
      type: PRODUCTS_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}/`);
    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_DELETE_REQUEST,
    });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);
    dispatch({
      type: PRODUCTS_DELETE_SUCCESS,
      payload:data
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_CREATE_REQUEST,
    });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(`/api/products/create/`, {}, config);
    dispatch({
      type: PRODUCTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_UPDATE_REQUEST,
    });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/update/${product._id}/`,
      product,
      config
    );
    dispatch({
      type: PRODUCTS_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewProduct =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_CREATE_REVIEW_REQUEST,
      });
      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
      dispatch({
        type: PRODUCTS_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
        console.log(error.response.data.detail)
      dispatch({
        type: PRODUCTS_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  
