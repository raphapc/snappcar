export class CarCitySearchModel {
  flags: Flags;
  priceInformation: PriceInformation;
  ci: string;
  distance: number;
  car: Car;
  user: User;

  constructor(
    flags: Flags,
    priceInformation: PriceInformation,
    ci: string,
    distance: number,
    car: Car,
    user: User
  ) {
    this.flags = flags;
    this.priceInformation = priceInformation;
    this.ci = ci;
    this.distance = distance;
    this.car = car;
    this.user = user;
  }
}

export interface Car {
  fuelType: string;
  createdAt: Date;
  year: number;
  make: string;
  gear: string;
  bodyType: string;
  model: string;
  seats: number;
  ownerId: string;
  reviewCount: number;
  images: any[];
}

export interface Flags {
  favorite: boolean;
  new: boolean;
  instantBookable: boolean;
  isKeyless: boolean;
  previouslyRented: boolean;
}

export interface PriceInformation {
  price: number;
  pricePerKilometer: number;
  freeKilometersPerDay: number;
  rentalDays: number;
  isoCurrencyCode: string;
}

export interface User {
  firstName: string;
  imageUrl: string;
  street: string;
  city: string;
}
