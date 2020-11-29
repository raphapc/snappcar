import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { City } from '../../city-search/city-search.service';
import { CarCitySearchModel } from '../model/car-city-search.model';

@Injectable({
  providedIn: 'root',
})
export class CarCitySearchService {
  constructor(private http: HttpClient) {}

  getCarByCity(
    city: City,
    sort: string,
    distance: string
  ): Observable<CarCitySearchModel[]> {
    return this.http
      .get(
        `https://api.snappcar.nl/v2/search/query?sort=${sort}&country=NL&lat=${city.lat}&lng=${city.lng}&max-distance=${distance}`
      )
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(error);
        }),
        map((response: any) => {
          let cars: CarCitySearchModel[] = [];

          if (response.results) {
            response.results.forEach((res: any) => {
              let car: CarCitySearchModel = res;
              cars.push(car);
            });
          }
          return cars;
        })
      );
  }
}
