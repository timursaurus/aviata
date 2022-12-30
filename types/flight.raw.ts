export interface RawFlight {
  itineraries: RawFlightItenerary[][];
  price_details: RawFlightPriceDetails;
  price: string;
  currency: string;
  bonus_usage: boolean;
  services: Record<string, RawFlightServiceDetails>;
  price_raw: number;
  validating_carrier: string;
  id: string;
  has_meta: boolean;
  has_offers: boolean;
  best_time: number;
  bonus_accrual: boolean;
  bonus_accrual_details: unknown;
  bonus_usage_details: unknown;
  provider: string;
  refundable: boolean;
  provider_class: string;
}

export interface RawFlightServiceDetails {
  full_description: string;
  alt_text: string;
  code: string;
  description: string;
  title: string;
  default: string;
  solution: string;
  value: string;
  icon: string;
}

export interface RawFlightPriceDetails {
  base_raw: number;
  modifiers: string;
  modifiers_raw: number;
  taxes: string;
  base: string;
  taxes_raw: number;
}

export interface RawFlightItenerary {
  dep_date: string;
  hash: string;
  dir_index: number;
  price: {
    currency: string;
    amount: string;
    price_raw: number;
  };
  layovers: number[];
  arr_date: string;
  allowed_offers: unknown[];
  carrier_name: string;
  is_meta: boolean;
  segments: RawFlightSegment[];
  stops: number;
  carrier: string;
  refundable: boolean;
  traveltime: number;
}

export interface RawFlightSegment {
  origin: string;
  airport_dest: string;
  arr_time_iso: string;
  dep_terminal: string;
  dep_time_iso: string;
  carrier_name: string;
  stop_locations: unknown[];
  dest_code: string;
  airport_dest_terminal: string;
  equipment: string;
  flight_num: string;
  stops: number;
  airport_origin: string;
  cabin: string;
  dep_time: string;
  dest: string;
  origin_code: string;
  baggage_options: RawBaggageOption[];
  arr_time: string;
  plane: string;
  services: RawFlightServiceDetails;
  fare_basis_code: string;
  airport_origin_terminal: string;
  arr_terminal: string;
  carrier: string;
  fare_seats: number;
}

export interface RawBaggageOption {
  unit: string;
  value: number;
}
