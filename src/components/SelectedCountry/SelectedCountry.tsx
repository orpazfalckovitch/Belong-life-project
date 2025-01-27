import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ICountry } from "../CountriesList/CountriesList";
import "./SelectedCountry.scss";

const SelectedCountry = React.memo(() => {
  const location = useLocation();
  const { country } = location.state || {};
  const navigate = useNavigate();

  if (!country) {
    return <div>No country data available</div>;
  }

  return (
    <div>
      <div
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back to countries list
      </div>
      <div className="selected-country">
        <h1>The selected country: {country.name}</h1>
        <img className="flag" src={country.flag} alt={`${country.name} flag`} />
      </div>
    </div>
  );
});

export default SelectedCountry;
