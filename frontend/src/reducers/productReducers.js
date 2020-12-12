import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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
