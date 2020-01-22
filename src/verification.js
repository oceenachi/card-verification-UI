import React, {useState}from 'react';
import Input from "./component/Input/Input";
import { NavLink } from "react-router-dom";
import axios from "axios";


function Verification(){
  const [value, setValues] = useState("");
  const [state, setState] = useState({});

  const handleChange = e => {
    setValues(e.target.value);
  };
  let response = {};
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      response = await axios.get(
        `https://card-verification-server.herokuapp.com//card-scheme/verify/` + value
      );
      setState(response);
    } catch (err) {
      console.log({ err });
    }
  };
  console.log("spd", state.data);
    return(
        <>
        <div className="container">

  <ul className="heading">
    <li>
      <NavLink
        to="/verify"
        activeStyle={{ textDecoration: "underline" }}
      >
        <span>Verify</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/stats"
        activeStyle={{ textDecoration: "underline" }}
      >
        <span>Get-stats</span>
      </NavLink>
    </li>
  </ul>
<form onSubmit={handleSubmit}>
  <Input className="myinput" value={value} onChange={handleChange} />
  <span>Enter the first 6 digits of your card</span>
  <br />
  <br />
</form>

<div className="payload">
  <div className="info">
    {state.data ? (
      <h3>
        SUCCESS:{" "}
        <span className="words">{state.data.success.toString()}</span>
      </h3>
    ) : (
      <h3>SUCCESS: </h3>
    )}
  </div>
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
      <h3>BANK: </h3>
    )}
  </div>
  <div className="info">
    {state.data ? (
      <h3>
        TYPE: <span className="words">{state.data.payload.type}</span>
      </h3>
    ) : (
      <h3>TYPE: </h3>
    )}
    {state.data ? (
      <h3>
        SCHEME:{" "}
        <span className="words">{state.data.payload.scheme}</span>
      </h3>
    ) : (
      <h3>SCHEME: </h3>
    )}
  </div>
</div>
</div>
        </>
    )

}

export default Verification