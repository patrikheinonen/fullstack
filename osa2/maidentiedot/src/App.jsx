import { useState, useEffect } from "react";

import countriesService from "./services/countries";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const SearchInput = ({ searchText, handleSearchChange }) => (
  <div>
    Search: <input value={searchText} onChange={handleSearchChange} />{" "}
  </div>
);

const CountriesContent = ({ countries, handleClick, selectedCountry }) => {
  if (selectedCountry !== null) {
    return <Country country={selectedCountry} />;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length <= 10 && countries.length > 1) {
    return countries.map((country) => (
      <li key={country.name.official}>
        {country.name.common}{" "}
        <Button
          text={"Show"}
          handleClick={() => handleClick(country.name.official)}
        />{" "}
      </li>
    ));
  }

  if (countries.length <= 0) {
    return <p>No matches</p>;
  }
  return <Country country={countries[0]} />;
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService
      .fetchWeather(
        country.capitalInfo.latlng[0],
        country.capitalInfo.latlng[1],
        import.meta.env.VITE_SOME_KEY
      )
      .then((weather) => {
        setWeather(weather);
      });
  }, []);

  if (!weather) {
    return;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      {country.capital.map((capital) => (
        <p key={country.name.official}>{capital}</p>
      ))}
      <p>{country.area}</p>
      <h3> languages </h3>
      {Object.entries(country.languages).map(([key, value]) => (
        //This fails with south africa but im not sure whast I should use as key
        //as json is missing ids.
        <p key={key}>{value}</p>
      ))}
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      ></img>
      <p>wind {weather.wind.speed}</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const searchCountries = (searchText) => {
    const query = searchText.toLowerCase();

    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    searchCountries(event.target.value);
    setSelectedCountry(null);
  };

  const handlePressShowCountry = (countryOfficialName) => {
    setSelectedCountry(
      filteredCountries.find(
        (country) => country.name.official === countryOfficialName
      )
    );
  };

  return (
    <div>
      <SearchInput
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />
      <CountriesContent
        countries={searchText ? filteredCountries : countries}
        handleClick={handlePressShowCountry}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default App;
