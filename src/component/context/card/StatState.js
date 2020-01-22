import React, { useReducer } from "react";
import { StatContext } from "./statContext";
import StatReducer from "./statReducer";
import axios from "axios";
import { GET_STATISTICS } from "../../../types";

function GetStatState(props) {
  const initialState = {
      statData : null
  };


  const [state, dispatch] = useReducer(StatReducer, initialState);

  const getStatistics = async (start, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/card-scheme/stats?start=${start}&limit=${limit}`
      );
      
        dispatch({
            type: GET_STATISTICS,
            payload: response.data
        })

    } catch (err) {
      console.log(err);
    }
  };

    return (
      <StatContext.Provider
        value={{
          statData: state.statData,
          getStatistics
        }}
      >
        {props.children}
      </StatContext.Provider>
    );
}
export default GetStatState;
