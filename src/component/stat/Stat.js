import React, { useState, useContext } from "react";
import "./stat.css";
import { NavLink } from "react-router-dom";
import { StatContext } from "../context/card/statContext";
import BeatLoader from "react-spinners/BeatLoader";

function Stat() {
  const statContext = useContext(StatContext);

  const {
    getStatistics,
    statData,
    loading,
    setLoading,
    statError
  } = statContext;

  const [value, setValue] = useState({
    start: "",
    limit: ""
  });
  const [err, setErr] =useState("")
  
  const { start, limit } = value;

  const handleChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(limit === "" || start === "" || parseInt(start) > parseInt(limit)){
        setErr("Start cannot be less than 1 and limit must be greater than or equal to start")
       
    } else {
      getStatistics(parseInt(start), parseInt(limit));
     

    }
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  let keys = null;
  let values = null;

  if (statData != null) {
    keys = Object.keys(statData.payload);
    values = Object.values(statData.payload);
  }

  return (
    <>
      <div className="bigStat">
        <div className="container ">
          <h1 className="title"> Number of Hits</h1>

          <ul className="heading">
            <li>
              <NavLink to="/verify">
                <span>Verification</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats">
                <span>Get-stats</span>
              </NavLink>
            </li>
          </ul>
          <div className="div-err">{err ? err : ""}</div>
          <div className="table-container">
            <div className="statContainer">
              <form className="formParent" onSubmit={handleSubmit}>
                <div>
                  START:{" "}
                  <input
                    className="inp"
                    type="number"
                    name="start"
                    value={value.start}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  LIMIT:{" "}
                  <input
                    className="inp"
                    type="number"
                    name="limit"
                    value={value.limit}
                    onChange={handleChange}
                  />
                </div>

                <input className="verify-btn" type="submit" value="GET-STAT" />
                {loading ? <BeatLoader color="white" size="10px" /> : ""}
              </form>
              <div className="statInfo">
                <div className="info">
                  <h4>
                    SUCCESS: {statData ? statData.success.toString() : ""}
                  </h4>
                  <h4>START: {statData ? statData.start : ""}</h4>
                  <h4>LIMIT: {statData ? statData.limit : ""}</h4>
                  <h4>SIZE: {statData ? statData.size : ""}</h4>
                </div>
              </div>
            </div>
            <div className="tableInfo">
              <table>
                <thead>
                  <tr>
                    <th>PAYLOAD</th>
                    <th>NUMBER OF HITS</th>
                  </tr>
                </thead>
                <tbody>
                  {keys && values !== null
                    ? keys.map((hit, i) => (
                        <tr key={i}>
                          <td>{hit}</td>
                          <td>{values[i]}</td>
                        </tr>
                      ))
                    : "No records found yet"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stat;
