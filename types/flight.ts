export interface Flight {
  itineraries: FlightItenerary[][];
  priceDetails: FlightPriceDetails;
  price: string;
  currency: string;
  isBonusUsage: boolean;
  services: Record<string, FlightServiceDetails>;
  priceRaw: number;
  validatingCarrier: string;
  id: string;
  hasMeta: boolean;
  hasOffers: boolean;
  bestTime: number;
  isBonusAccrual: boolean;
  bonusAccrualDetails: unknown;
  bonusUsageDetails: unknown;
  provider: string;
  isRefundable: boolean;
  providerClass: string;
}

export interface FlightServiceDetails {
  fullDescription: string;
  altText: string;
  code: string;
  description: string;
  title: string;
  default: string;
  solution: string;
  value: string;
  icon: string;
}

export interface FlightPriceDetails {
  baseRaw: number;
  modifiers: string;
  modifiersRaw: number;
  taxes: string;
  base: string;
  taxesRaw: number;
}

export interface FlightItenerary {
  departureDate: string;
  hash: string;
  dirIndex: number;
  price: {
    currency: string;
    amount: string;
    priceRaw: number;
  };
  layovers: number[];
  arrivalDate: string;
  allowedOffers: unknown[];
  carrierName: string;
  isMeta: boolean;
  segments: FlightSegment[];
  stops: number;
  carrier: string;
  isRefundable: boolean;
  travelTime: number;
}

export interface FlightSegment {
  origin: string;
  airportDestination: string;
  arrivalTimeISO: string;
  departureTerminal: string;
  departureTimeISO: string;
  carrierName: string;
  stopLocations: unknown[];
  destinationCode: string;
  airportDestinationTerminal: string;
  equipment: string;
  flightNum: string;
  stops: number;
  airportOrigin: string;
  cabin: string;
  departureTime: string;
  destination: string;
  originCode: string;
  baggageOptions: BaggageOption[];
  arrivalTime: string;
  plane: string;
  services: FlightServiceDetails;
  fareBasisCode: string;
  airportOriginTerminal: string;
  arrivalTerminal: string;
  carrier: string;
  fareSeats: number;
}

export interface BaggageOption {
  unit: string;
  value: number;
}
