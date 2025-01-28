import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCountriesData } from "../../services/CountriesService";
import CountryCard from "../CountryCard/CountryCard";
import Search from "../Search/Search";
import "./CountriesList.scss";
import { ICountry } from "../../models/Country.interface";

export function CountriesList() {
  const [originalCountriesList, setOriginalCountriesList] =
    useState<any>("Loading...");
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = getCountriesData().subscribe(
      (response: any) => {
        setCountriesList(response);
        setOriginalCountriesList(response);
        setLoading(false);
      },
      () => {
        setError("Failed to fetch data from the server");
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  //filter the list according to search input
  const searchClicked = (searchInput: string) => {
    // handle search click event
    if (searchInput.length > 2) {
      const countriesBySearch = originalCountriesList.filter(
        (country: ICountry) => {
          return country.name.toLowerCase().includes(searchInput.toLowerCase());
        }
      );
      if (Array.isArray(countriesBySearch) && countriesBySearch.length) {
        setCountriesList(countriesBySearch);
      } else {
        setCountriesList([]);
      }
    } else if (searchInput.length == 0) {
      setCountriesList(originalCountriesList);
    }
  };

  //navigate to selected country screen
  const handleCountryClick = (country: ICountry) => {
    navigate(`/country/${country.id}`, { state: { country } });
  };

  return (
    <div>
      {loading ? (
        <h1>
          <div className="loading">Loading</div>
        </h1>
      ) : Array.isArray(countriesList) && countriesList.length ? (
        <>
          <Search onKeyUp={searchClicked} />
          <div className="countries-list">
            {countriesList.map((country: any) => (
              <CountryCard
                onClick={() => handleCountryClick(country)}
                key={country.id}
                country={country}
              />
            ))}
          </div>
        </>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Search onKeyUp={searchClicked} />
          <h1 className="no-countries">Country not exists</h1>
        </>
      )}
    </div>
  );
}

export default CountriesList;
