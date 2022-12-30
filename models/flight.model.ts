import type {
  BaggageOption,
  Flight,
  FlightItenerary,
  FlightPriceDetails,
  FlightSegment,
  FlightServiceDetails,
} from "@/types/flight";
import type {
  RawFlight,
  RawFlightItenerary,
  RawFlightSegment,
  RawFlightServiceDetails,
} from "@/types/flight.raw";

export class FlightSerializer implements Flight {
  bestTime: number;
  currency: string;
  hasMeta: boolean;
  hasOffers: boolean;
  id: string;
  isBonusAccrual: boolean;
  isBonusUsage: boolean;
  itineraries: FlightItenerary[][];
  price: string;
  priceDetails: FlightPriceDetails;
  priceRaw: number;
  provider: string;
  providerClass: string;
  isRefundable: boolean;
  services: Record<string, FlightServiceDetails>;
  validatingCarrier: string;
  bonusAccrualDetails: unknown;
  bonusUsageDetails: unknown;
  constructor({
    bestTime,
    currency,
    hasMeta,
    hasOffers,
    id,
    isBonusAccrual,
    isBonusUsage,
    itineraries,
    price,
    priceDetails,
    priceRaw,
    provider,
    providerClass,
    isRefundable,
    services,
    validatingCarrier,
  }: Flight) {
    this.bestTime = bestTime;
    this.currency = currency;
    this.hasMeta = hasMeta;
    this.hasOffers = hasOffers;
    this.id = id;
    this.isBonusAccrual = isBonusAccrual;
    this.isBonusUsage = isBonusUsage;
    this.itineraries = itineraries;
    this.price = price;
    this.priceDetails = priceDetails;
    this.priceRaw = priceRaw;
    this.provider = provider;
    this.providerClass = providerClass;
    this.isRefundable = isRefundable;
    this.services = services;
    this.validatingCarrier = validatingCarrier;
  }

  static serialize({
    best_time,
    bonus_accrual,
    bonus_usage,
    currency,
    has_meta,
    has_offers,
    id,
    itineraries,
    price,
    price_details,
    price_raw,
    provider,
    provider_class,
    refundable,
    services,
    validating_carrier,
    bonus_accrual_details,
    bonus_usage_details,
  }: RawFlight) {
    return new FlightSerializer({
      bestTime: best_time,
      currency,
      hasMeta: has_meta,
      hasOffers: has_offers,
      id,
      isBonusAccrual: bonus_accrual,
      isBonusUsage: bonus_usage,
      itineraries: itineraries.map((its) =>
        FlightItenerarySerializer.serializeMany(its)
      ),
      price,
      priceDetails: {
        base: price_details.base,
        baseRaw: price_details.base_raw,
        modifiers: price_details.modifiers,
        modifiersRaw: price_details.modifiers_raw,
        taxes: price_details.taxes,
        taxesRaw: price_details.taxes_raw,
      },
      bonusAccrualDetails: bonus_accrual_details,
      bonusUsageDetails: bonus_usage_details,
      priceRaw: price_raw,
      provider,
      providerClass: provider_class,
      isRefundable: refundable,
      validatingCarrier: validating_carrier,
      services: FlightServiceDetailsSerializer.serializeKeyed(services),
    });
  }
  static serializeMany(rawFlights: RawFlight[]) {
    return rawFlights?.length
      ? rawFlights.map((rawFlight) => FlightSerializer.serialize(rawFlight))
      : [];
  }
}

export class FlightItenerarySerializer implements FlightItenerary {
  arriveDate: string;
  carrier: string;
  carrierName: string;
  departureDate: string;
  dirIndex: number;
  hash: string;
  isMeta: boolean;
  isRefundable: boolean;
  layovers: number[];
  price: {
    currency: string;
    amount: string;
    priceRaw: number;
  };
  segments: FlightSegment[];
  stops: number;
  travelTime: number;
  allowedOffers: unknown[];
  constructor({
    arriveDate,
    carrier,
    carrierName,
    departureDate,
    dirIndex,
    hash,
    isMeta,
    isRefundable,
    layovers,
    price,
    segments,
    stops,
    travelTime,
    allowedOffers,
  }: FlightItenerary) {
    this.arriveDate = arriveDate;
    this.carrier = carrier;
    this.carrierName = carrierName;
    this.departureDate = departureDate;
    this.dirIndex = dirIndex;
    this.hash = hash;
    this.isMeta = isMeta;
    this.isRefundable = isRefundable;
    this.layovers = layovers;
    this.price = price;
    this.segments = segments;
    this.stops = stops;
    this.travelTime = travelTime;
    this.allowedOffers = allowedOffers;
  }

  static serialize({
    carrier,
    carrier_name,
    dep_date,
    arr_date,
    traveltime,
    dir_index,
    hash,
    is_meta,
    refundable,
    layovers,
    price,
    segments,
    stops,
    allowed_offers,
  }: RawFlightItenerary): FlightItenerary {
    return new FlightItenerarySerializer({
      arriveDate: arr_date,
      carrier,
      carrierName: carrier_name,
      departureDate: dep_date,
      dirIndex: dir_index,
      hash,
      isMeta: is_meta,
      isRefundable: refundable,
      layovers,
      price: {
        currency: price.currency,
        amount: price.amount,
        priceRaw: price.price_raw,
      },
      segments: FlightSegmentSerializer.serializeMany(segments),
      stops,
      travelTime: traveltime,
      allowedOffers: allowed_offers,
    });
  }

  static serializeMany(
    rawIteneraries: RawFlightItenerary[]
  ): FlightItenerary[] {
    return rawIteneraries?.length
      ? rawIteneraries.map((rawItenerary) =>
          FlightItenerarySerializer.serialize(rawItenerary)
        )
      : [];
  }
}

export class FlightSegmentSerializer implements FlightSegment {
  airportDestination: string;
  airportDestinationTerminal: string;
  airportOrigin: string;
  airportOriginTerminal: string;
  arriveTerminal: string;
  arriveTime: string;
  arriveTimeISO: string;
  baggageOptions: BaggageOption[];
  cabin: string;
  carrier: string;
  carrierName: string;
  stops: number;
  departureTerminal: string;
  departureTime: string;
  departureTimeISO: string;
  destination: string;
  destinationCode: string;
  equipment: string;
  fareBasisCode: string;
  flightNum: string;
  origin: string;
  originCode: string;
  fareSeats: number;
  plane: string;
  services: FlightServiceDetails;
  stopLocations: unknown[];

  constructor({
    airportDestination,
    airportDestinationTerminal,
    airportOrigin,
    airportOriginTerminal,
    arriveTerminal,
    arriveTime,
    arriveTimeISO,
    baggageOptions,
    cabin,
    carrier,
    carrierName,
    stops,
    departureTerminal,
    departureTime,
    departureTimeISO,
    destination,
    destinationCode,
    equipment,
    fareBasisCode,
    flightNum,
    origin,
    originCode,
    fareSeats,
    plane,
    services,
    stopLocations,
  }: FlightSegment) {
    this.airportDestination = airportDestination;
    this.airportDestinationTerminal = airportDestinationTerminal;
    this.airportOrigin = airportOrigin;
    this.airportOriginTerminal = airportOriginTerminal;
    this.arriveTerminal = arriveTerminal;
    this.arriveTime = arriveTime;
    this.arriveTimeISO = arriveTimeISO;
    this.baggageOptions = baggageOptions;
    this.cabin = cabin;
    this.carrier = carrier;
    this.carrierName = carrierName;
    this.stops = stops;
    this.departureTerminal = departureTerminal;
    this.departureTime = departureTime;
    this.departureTimeISO = departureTimeISO;
    this.destination = destination;
    this.destinationCode = destinationCode;
    this.equipment = equipment;
    this.fareBasisCode = fareBasisCode;
    this.flightNum = flightNum;
    this.origin = origin;
    this.originCode = originCode;
    this.fareSeats = fareSeats;
    this.plane = plane;
    this.services = services;
    this.stopLocations = stopLocations;
  }

  static serialize({
    stops,
    airport_dest,
    airport_dest_terminal,
    airport_origin,
    airport_origin_terminal,
    arr_terminal,
    arr_time,
    arr_time_iso,
    baggage_options,
    cabin,
    carrier,
    carrier_name,
    dep_terminal,
    dep_time,
    dep_time_iso,
    dest,
    dest_code,
    equipment,
    fare_basis_code,
    fare_seats,
    flight_num,
    origin,
    origin_code,
    plane,
    services,
    stop_locations,
  }: RawFlightSegment) {
    return new FlightSegmentSerializer({
      airportDestination: airport_dest,
      airportDestinationTerminal: airport_dest_terminal,
      airportOrigin: airport_origin,
      airportOriginTerminal: airport_origin_terminal,
      arriveTerminal: arr_terminal,
      arriveTime: arr_time,
      arriveTimeISO: arr_time_iso,
      baggageOptions: baggage_options,
      cabin,
      carrier,
      carrierName: carrier_name,
      stops,
      departureTerminal: dep_terminal,
      departureTime: dep_time,
      departureTimeISO: dep_time_iso,
      destination: dest,
      destinationCode: dest_code,
      equipment,
      fareBasisCode: fare_basis_code,
      fareSeats: fare_seats,
      flightNum: flight_num,
      origin,
      originCode: origin_code,
      plane,
      stopLocations: stop_locations,
      services: FlightServiceDetailsSerializer.serialize(services),
    });
  }

  static serializeMany(rawSegments: RawFlightSegment[]): FlightSegment[] {
    return rawSegments?.length
      ? rawSegments.map((rawSegment) =>
          FlightSegmentSerializer.serialize(rawSegment)
        )
      : [];
  }
}

export class FlightServiceDetailsSerializer implements FlightServiceDetails {
  fullDescription: string;
  icon: string;
  solution: string;
  title: string;
  value: string;
  altText: string;
  description: string;
  code: string;
  default: string;
  constructor({
    altText,
    description,
    code,
    fullDescription,
    icon,
    solution,
    title,
    value,
    default: default_,
  }: FlightServiceDetails) {
    this.altText = altText;
    this.description = description;
    this.code = code;
    this.fullDescription = fullDescription;
    this.icon = icon;
    this.solution = solution;
    this.title = title;
    this.value = value;
    this.default = default_;
  }
  static serialize(rawFlightService: RawFlightServiceDetails) {
    return new FlightServiceDetailsSerializer({
      altText: rawFlightService.alt_text,
      description: rawFlightService.description,
      code: rawFlightService.code,
      fullDescription: rawFlightService.full_description,
      icon: rawFlightService.icon,
      solution: rawFlightService.solution,
      title: rawFlightService.title,
      value: rawFlightService.value,
      default: rawFlightService.default,
    });
  }
  static serializeMany(
    rawServices: RawFlightServiceDetails[]
  ): FlightServiceDetails[] {
    return rawServices?.length
      ? rawServices.map((rawService) =>
          FlightServiceDetailsSerializer.serialize(rawService)
        )
      : [];
  }

  static serializeKeyed(
    rawServices: Record<string, RawFlightServiceDetails>
  ): Record<string, FlightServiceDetails> {
    return Object.keys(rawServices).reduce(
      (acc: Record<string, FlightServiceDetails>, key) => {
        acc[key] = FlightServiceDetailsSerializer.serialize(rawServices[key]);
        return acc;
      },
      {}
    );
  }
}
