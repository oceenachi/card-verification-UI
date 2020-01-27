import React, { useReducer } from "react";
import { StatContext } from "./statContext";
import StatReducer from "./statReducer";
import axios from "axios";
import { GET_STATISTICS, SET_ERROR, TRIGGER } from "../../../types";

function GetStatState(props) {
  const initialState = {
    statData: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(StatReducer, initialState);

  const getStatistics = async (start, limit) => {
    setLoading();
    try {
      const response = await axios.get(
        `https://card-verification-server.herokuapp.com/card-scheme/stats?start=${start}&limit=${limit}`
      );
      dispatch({
        type: GET_STATISTICS,
        payload: response.data
      });
    } catch (error) {
      
      dispatch({
        type: SET_ERROR,
        payload: error.response.data
      });
    }
  };

  const setLoading = () => dispatch({ type: TRIGGER });

  return (
    <StatContext.Provider
      value={{
        statData: state.statData,
        loading: state.loading,
        statError: state.error,
        getStatistics,
        setLoading
      }}
    >
      {props.children}
    </StatContext.Provider>
  );
}
export default GetStatState;
