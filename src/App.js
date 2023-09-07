import React, { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [searchValue, setSearchValue] = useState("salut");
  const [rangeValue, setRangeValue] = useState(6);
  const [sortValue, setSortValue] = useState("croissant");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <header>
        <h1>React country App</h1>
        <input
          type="text"
          placeholder="nom du pays"
          onInput={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div>
          <input
            type="range"
            min="0"
            max="12"
            onInput={(e) => setRangeValue(e.target.value)}
          />{" "}
          <span> {rangeValue}</span>
        </div>
        <div className="btn-container">
          <button onClick={() => setSortValue("croissant")}>Croissant</button>
          <button onClick={() => setSortValue("décroissant")}>
            Décroissant
          </button>
          <button onClick={() => setSortValue("alphabétique")}>
            Alphabétique
          </button>
        </div>
      </header>
      <main>
        {countries
          .filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .sort((a, b) => {
            if (sortValue === "croissant") {
              return a.population - b.population;
            } else if (sortValue === "décroissant") {
              return b.population - a.population;
            } else if (sortValue === "alphabétique") {
              return a.name.common.localeCompare(b.name.common);
            }
          })
          .slice(0, rangeValue)
          .map((country, index) => {
            return <Card country={country} key={index} />;
          })}
      </main>
    </div>
  );
}

export default App;
