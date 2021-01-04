import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";

export const productReducer = (
  state = { loading: false, productList: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, productList: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, productList: action.payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: false, product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
