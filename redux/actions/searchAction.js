import {
  FETCHING_REQUEST,
  FETCHING_SUCCESS,
  FETCHING_FAILURE,
  HANDLING_INPUT,
  UPDATING_FAVS
} from "./types";

export const fetchRequest = () => ({ type: FETCHING_REQUEST });
export const fetchSuccess = (arr) => ({ type: FETCHING_SUCCESS, payload: arr });
export const fetchFailure = (error) => ({
  type: FETCHING_FAILURE,
  payload: error,
});
export const handleInput = (name) => ({ type: HANDLING_INPUT, payload: name });
export const updateFavs = (favsArray) => ({type:UPDATING_FAVS, payload:favsArray});

export const fetchResults = (name) => {
  const processResult = (result) => {
    return {
      title: result.Title,
      year: result.Year,
      id: result.imdbID,
      img: result.Poster,
    };
  };
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      let response = await fetch(
        `https://www.omdbapi.com/?apikey=e09fdb8f&s=${name}`
      );
      let res = await response.json();
      const distintArr = Array.from(
        new Set(res.Search.map((r) => r.imdbID))
      ).map((id) => {
        return {
          imdbID: id,
          Title: res.Search.find((r) => r.imdbID === id).Title,
          Year: res.Search.find((r) => r.imdbID === id).Year,
          Poster: res.Search.find((r) => r.imdbID === id).Poster,
        };
      });
      const arr = distintArr.map((result) => processResult(result));
      // return arr;
      dispatch(fetchSuccess(arr));
    } catch (error) {
      dispatch(fetchFailure(error));
    }
  }; 
};


