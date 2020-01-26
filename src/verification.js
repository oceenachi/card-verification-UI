import React, { useState, useContext } from "react";
import Input from "./component/Input/Input";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {MoonLoader} from "react-spinners/MoonLoader";



function Verification() {
  const [value, setValues] = useState("");
  const [state, setState] = useState({});
  const [error, setError] = useState("");

  // if(error)
  // console.log(error.response.data.message)

  const handleChange = e => {
    setValues(e.target.value);
  };
  let response = {};
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      response = await axios.get(
        `https://card-verification-server.herokuapp.com/card-scheme/verify/` +
          value
      );
      setState(response);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
    <div className="big-container">
      <div className="container">
      <h1 className="title" >Vela Verify</h1>
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
        <div className="card">
        <div className="info">
            {state.data ? (
              <h3>
                COUNTRY:{" "}
                <span className="words">{state.data.payload.name}</span>
              </h3>
            ) : (
              <h3>COUNTRY: </h3>
            )}
            {state.data ? (
              <h3>
                BANK: <span className="words">{state.data.payload.bank}</span>
              </h3>
            ) : (
              <h3>BANK </h3>
            )}
          </div>
        <form onSubmit={handleSubmit}>
          <Input className="myinput" value={value} onChange={handleChange} />

          {error ? (
            <span className="span-error" >{error.response.data.message}</span>
          ) : (
            <div>
              <small>Enter the first 6 digits of your card</small>
              <br />
              <br />
              <button className="verify-btn">Verify</button>
            </div>
          )}
          <br />
        </form>
       
          <div className="info type-scheme">
            {state.data ? (
              <h3>
                TYPE: <span className="words">{state.data.payload.type}</span>
              </h3>
            ) : (
              <h3>TYPE </h3>
            )}
            {state.data ? (
              <h3>
                SCHEME{" "}
                <span className="words">{state.data.payload.scheme}</span>
              </h3>
            ) : (
              <h3>SCHEME </h3>
            )}
          </div>
         
        </div>
        <div className="success">
            {state.data ? (
              <h3>
                SUCCESS:{" "}
                <span className="words">{state.data.success.toString()}</span>
              </h3>
            ) : (
              <h3>SUCCESS: </h3>
            )}
          </div>
        

       
      </div>
      </div>
    </>
  );
}

export default Verification;
