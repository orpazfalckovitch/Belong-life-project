import { ajax } from "rxjs/ajax";
import { catchError, switchMap } from "rxjs/operators";
import { of, from } from "rxjs";
import { openDB } from "idb";
import { ICountry } from "../interfaces/ICountry";

export function getCountriesData() {
  const URL = "https://restcountries.com/v3.1/all";

  return ajax.getJSON(URL).pipe(
    switchMap((response: any) => {
      const countries = response.map((country: any) => ({
        name: country.name ? country.name.common : country.name,
        flag: country.flags ? country.flags.svg : "src/assets/flags/israel.svg",
        id: country.cca2,
      }));
      return from(getCountriesFromIndexedDB(countries));
    }),
    catchError(() => {
      return of([]);
    })
  );
}

export async function setCountryToIndexedDB(country: ICountry) {
  const db = await openDB("Countries", 1, {
    upgrade(db) {
      db.createObjectStore("selectedCountries", { keyPath: "id" });
    },
  });

  await db.put("selectedCountries", country);
}

//get selected countries from indexedDB
export async function getCountriesFromIndexedDB(
  originalCountriesList: ICountry[]
) {
  const db = await openDB("Countries", 1, {
    upgrade(db) {
      db.createObjectStore("selectedCountries", { keyPath: "id" });
    },
  });
  const selectedCountries = await db.getAll("selectedCountries");

  //check if country is missing from the data, remove it from the lists.
  if (Array.isArray(selectedCountries) && selectedCountries.length) {
    const selectedCountriesExist = selectedCountries.filter(
      (selectedCountry: ICountry) => {
        const isIdExists = (country: ICountry) =>
          country.id == selectedCountry.id;
        return originalCountriesList.some(isIdExists);
      }
    );
    if (
      Array.isArray(selectedCountriesExist) &&
      selectedCountriesExist.length
    ) {
      const countriesWithSelected: ICountry[] = selectedCountries.concat(
        originalCountriesList
      );

      //remove duplicate items by ids.
      const uniqueArray: ICountry[] = countriesWithSelected.filter(
        (country: ICountry, index: number, array: ICountry[]) =>
          array.findIndex((item: ICountry) => item.id === country.id) === index
      );
      return uniqueArray;
    }
  }
  return originalCountriesList;
}
