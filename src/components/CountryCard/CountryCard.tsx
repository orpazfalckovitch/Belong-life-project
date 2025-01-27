import React from "react";
import "./CountryCard.scss";

interface Props {
  country: {
    id: string;
    name: string;
    flag: string;
  };
  onClick: (country: any) => void;
}

export function CountryCard({ country, onClick }: Props) {
  return (
    <div className="country-container" key={country.id} onClick={onClick}>
      <div className="flag-container">
        <img className="flag" src={country.flag} alt={`${country.name} flag`} />
      </div>
      <div className="name">
        <span>{country.name}</span>
      </div>
    </div>
  );
}

export default CountryCard;
