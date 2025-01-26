import React, { useState, useEffect } from "react";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import CountryCard from "./CountryCard/CountryCard";

export interface ICountry {
  id: string;
  name: string;
  flag: string;
}

function CountriesList() {
  const URL = "https://restcountries.com/v3.1/all";
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = ajax(URL)
      .pipe(
        map((response) => response.response),
        catchError(() => {
          setError("Failed to fetch data");
          return of([]);
        })
      )
      .subscribe((data: any) => {
        const countries = data.map((country: any) => {
          country.name = country.name ? country.name.common : country.name;
          country.flag = country.flags
            ? country.flags.svg
            : "src/assets/flags/israel.svg";
          country.id = country.cca2;
          return country;
        });

        setCountriesList(countries);
      });

    // Clean up subscription
    return () => subscription.unsubscribe();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {Array.isArray(countriesList) ? (
        <ul>
          {countriesList.map((country: any) => (
            <CountryCard key={country.id} country={country}></CountryCard>
          ))}
        </ul>
      ) : (
        <div>{countriesList}</div>
      )}
    </div>
  );
}

export default CountriesList;
