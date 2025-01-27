import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export function getCountriesData() {
  const URL = "https://restcountries.com/v3.1/all";

  return ajax.getJSON(URL).pipe(
    map((response) =>
      response.map((country) => ({
        name: country.name ? country.name.common : country.name,
        flag: country.flags ? country.flags.svg : "src/assets/flags/israel.svg",
        id: country.cca2,
      }))
    ),
    catchError((error) => {
      return error;
    })
  );
}
