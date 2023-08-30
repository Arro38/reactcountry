import React from "react";

function Card({ country }) {
  return (
    <div className="card">
      <img src={country.flags.svg} alt="" width="250px" />
      <div className="card-body">
        <h2>{country.name.common}</h2>
        <p>Population : {country.population}</p>
        <p>Capital : {country.capital}</p>
      </div>
    </div>
  );
}

export default Card;
