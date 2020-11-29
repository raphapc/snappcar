import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { City, CitySearchService } from '../city-search/city-search.service';
import { CarCitySearchModel } from './model/car-city-search.model';
import { CarCitySearchService } from './service/car-city-search.service';
@Component({
  selector: 'app-car-city-search',
  templateUrl: './car-city-search.component.html',
  styleUrls: ['./car-city-search.component.scss'],
})
export class CarCitySearchComponent implements OnInit {
  public distanceOptions = [
    { label: '3Km', value: '3000' },
    { label: '5Km', value: '5000' },
    { label: '7Km', value: '7000' },
  ];
  public sortOptions = ['price', 'recommended', 'distance'];
  public selectedDistance: string = this.distanceOptions[0].value;
  public selectedSort: string = this.sortOptions[0];
  public cities: City[] = [];
  public cityName: string = '';
  public carsCity: CarCitySearchModel[] = [];
  public filteredCities: City[] = [];
  public cityCtrl = new FormControl();
  private _subscriptions = new Subscription();
  constructor(
    private cityService: CitySearchService,
    private carService: CarCitySearchService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.cityCtrl.valueChanges
        .pipe(
          debounceTime(500),
          switchMap((value) => this.cityService.searchCities(value)),
          tap((cities: City[]) => {
            this.filteredCities = cities;
          }),
          filter((cities: City[]) => cities.length === 1),
          switchMap((cities) =>
            this.carService.getCarByCity(
              cities[0],
              this.selectedSort,
              this.selectedDistance
            )
          )
        )
        .subscribe((carsCity: CarCitySearchModel[]) => {
          this.carsCity = carsCity;
        })
    );
  }

  selectDistance(distance: string) {
    this.selectedDistance = distance;
    this._subscriptions.add(this._getCarsbyCity());
  }

  selectSort(sort: string) {
    this.selectedSort = sort;
    if (this.filteredCities.length === 1) {
      this._subscriptions.add(this._getCarsbyCity());
    }
  }

  private _getCarsbyCity() {
    return this.carService
      .getCarByCity(
        this.filteredCities[0],
        this.selectedSort,
        this.selectedDistance
      )
      .subscribe((carsCity: CarCitySearchModel[]) => {
        this.carsCity = carsCity;
      });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
