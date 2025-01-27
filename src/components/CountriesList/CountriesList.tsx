import React, { useState, useEffect } from "react";

import { getCountriesData } from "../../services/CountriesService";
import CountryCard from "../CountryCard/CountryCard";
import Search from "../Search/Search";

export interface ICountry {
  id: string;
  name: string;
  flag: string;
}

export function CountriesList() {
  const [originalCountriesList, setOriginalCountriesList] =
    useState<any>("Loading...");
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = getCountriesData().subscribe(
      (response: any) => {
        setCountriesList(response);
        setOriginalCountriesList(response);
      },
      () => {
        setError("Failed to fetch data from the server");
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

  return (
    <div>
      <Search onKeyUp={searchClicked}></Search>
      {Array.isArray(countriesList) && countriesList.length ? (
        <ul>
          {countriesList.map((country: any) => (
            <CountryCard key={country.id} country={country}></CountryCard>
          ))}
        </ul>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>There is no country</div>
      )}
    </div>
  );
}

export default CountriesList;
