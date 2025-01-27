import React, { useState, useEffect } from "react";

import { getCountriesData } from "../../services/CountriesService";
import CountryCard from "../CountryCard/CountryCard";

export interface ICountry {
  id: string;
  name: string;
  flag: string;
}

export function CountriesList() {
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = getCountriesData().subscribe(
      (response: any) => setCountriesList(response),
      () => {
        setError("Failed to fetch data from the server");
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {Array.isArray(countriesList) && countriesList.length ? (
        <ul>
          {countriesList.map((country: any) => (
            <CountryCard key={country.id} country={country}></CountryCard>
          ))}
        </ul>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CountriesList;
