import { TestBed } from '@angular/core/testing';

import { CarCitySearchService } from './car-city-search.service';

describe('CarCitySearchService', () => {
  let service: CarCitySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarCitySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
