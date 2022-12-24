export interface Flight {
  itineraries: FlightItenerary[][];
  price_details: FlightPriceDetails;
  price: string;
  currency: string;
  bonus_usage: boolean;
  services: Record<string, FlightServiceDetails>;
  price_raw: number;
  validating_carrier: string;
  id: string;
  has_meta: boolean;
  has_offers: boolean;
  best_time: number;
  bonus_accrual: boolean;
  // bonus_accrual_details?: any;
  // bonus_usage_details?: any;
  provider: string;
  refundable: boolean;
  provider_class: string;
}

export interface FlightServiceDetails {
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

export interface FlightPriceDetails {
  base_raw: number;
  modifiers: string;
  modifiers_raw: number;
  taxes: string;
  base: string;
  taxes_raw: number;
}

export interface FlightItenerary {
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
  // allowed_offers: any[];
  carrier_name: string;
  is_meta: boolean;
  segments: FlightSegment[];
  stops: number;
  carrier: string;
  refundable: boolean;
  traveltime: number;
}

export interface FlightSegment {
  origin: string;
  airport_dest: string;
  arr_time_iso: Date;
  dep_terminal: string;
  dep_time_iso: Date;
  carrier_name: string;
  // stop_locations: any[];
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
  baggage_options: BaggageOption[];
  arr_time: string;
  plane: string;
  services: FlightServiceDetails;
  fare_basis_code: string;
  airport_origin_terminal: string;
  arr_terminal: string;
  carrier: string;
  fare_seats: number;
}

export interface BaggageOption {
  unit: string;
  value: number;
}
