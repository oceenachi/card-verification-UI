import React, { useState, useContext } from "react";
import "./stat.css";
import { NavLink } from "react-router-dom";
import { StatContext } from "../context/card/statContext";


function Stat() {
  const statContext = useContext(StatContext);

  const { getStatistics, statData } = statContext;

  const [value, setValue] = useState({
    start: "",
    limit: ""
  });

  const { start, limit } = value;

  const handleChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    getStatistics(parseInt(start), parseInt(limit));
  };
  let keys = null;
  let values = null;

  if (statData != null) {
    keys = Object.keys(statData.payload);
    values = Object.values(statData.payload);
  }

  return (
    <>
      <div className="container ">
        <h1>Number of Hits</h1>
        <ul className="heading">
          <li>
            <NavLink
              to="/verify"
              exact
              activeStyle={{ textDecoration: "underline" }}
            >
              <span>Verify</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              exact
              activeStyle={{ textDecoration: "underline" }}
            >
              <span>Get-stats</span>
            </NavLink>
          </li>
        </ul>
        <div className="statContainer">
          <form className="formParent" onSubmit={handleSubmit}>
            <div>
              Start:{" "}
              <input
               className="inp"
                type="number"
                name="start"
                value={value.start}
                onChange={handleChange}
              />
            </div>
            <div>
              Limit:{" "}
              <input
              className="inp"
                type="number"
                name="limit"
                value={value.limit}
                onChange={handleChange}
              />
            </div>
            <input className="btn" type="submit" value="GET-STAT" />
          </form>
          <div className="statInfo">
            <div className="info">
              <h4>SUCCESS: {statData ? statData.success.toString() : ""}</h4>
              <h4>START: {statData ? statData.start : ""}</h4>
              <h4>LIMIT: {statData ? statData.limit : ""}</h4>
              <h4>SIZE: {statData ? statData.size : ""}</h4>
            </div>
            <div className="tableInfo">
              <table>
                <thead>
                  <tr>
                    <th>payload</th>
                    <th>Number Of hits</th>
                  </tr>
                </thead>
                <tbody>
                  {keys && values !== null ? (
                      keys.map((hit, i) => (
                        <tr key={i}>
                        <td>{hit}</td>
                        <td>{values[i]}</td>
                        </tr>
                      ))
                  ) : (
                    "No records found"
                  )}

                  
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
