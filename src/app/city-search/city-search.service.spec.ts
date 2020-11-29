import { TestBed } from '@angular/core/testing';

import { City, CitySearchService } from './city-search.service';

describe('CitySearchService', () => {
  let service: CitySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#searchCities should return cities filtered by name', () => {
    service.searchCities('Utrecht').subscribe((cities: City[]) => {
      expect(cities[0].name).toEqual('Utrecht');
    });
  });
});
