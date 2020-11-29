import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCitySearchComponent } from './car-city-search.component';

describe('CarCitySearchComponent', () => {
  let component: CarCitySearchComponent;
  let fixture: ComponentFixture<CarCitySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCitySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
