import {
  FETCHING_REQUEST,
  FETCHING_SUCCESS,
  FETCHING_FAILURE,
  HANDLING_INPUT,
  UPDATING_FAVS
} from "../actions/types";

const initialState = {
  name: "",
  isFetching: false,
  errorMsg: "",
  results: [],
  favs: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_REQUEST:
      return { ...state, isFetching: true };
    case FETCHING_FAILURE:
      return { ...state, isFetching: false, errorMsg: action.payload };
    case FETCHING_SUCCESS:
      return { ...state, isFetching: false, results: action.payload };
    case HANDLING_INPUT:
      return { ...state, isFetching: false, name: action.payload };
    case UPDATING_FAVS:
      return { ...state, isFetching: false, favs: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
