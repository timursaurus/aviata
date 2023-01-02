import type {
  Flight,
  FlightItenerary,
  FlightSegment,
  FlightServiceDetails,
} from "@/types/flight";
import type {
  RawFlight,
  RawFlightItenerary,
  RawFlightSegment,
  RawFlightServiceDetails,
} from "@/types/flight.raw";

export class FlightSerializer {
  constructor(flight: Flight) {
    Object.assign(this, flight);
  }

  static serialize(rawFlight: RawFlight) {
    return new FlightSerializer({
      ...rawFlight,
      bestTime: rawFlight.best_time,
      hasMeta: rawFlight.has_meta,
      hasOffers: rawFlight.has_offers,
      isBonusAccrual: rawFlight.bonus_accrual,
      isBonusUsage: rawFlight.bonus_usage,
      itineraries: rawFlight.itineraries.map((its) =>
        FlightItenerarySerializer.serializeMany(its)
      ),
      priceDetails: {
        base: rawFlight.price_details.base,
        baseRaw: rawFlight.price_details.base_raw,
        modifiers: rawFlight.price_details.modifiers,
        modifiersRaw: rawFlight.price_details.modifiers_raw,
        taxes: rawFlight.price_details.taxes,
        taxesRaw: rawFlight.price_details.taxes_raw,
      },
      bonusAccrualDetails: rawFlight.bonus_accrual_details,
      bonusUsageDetails: rawFlight.bonus_usage_details,
      priceRaw: rawFlight.price_raw,
      providerClass: rawFlight.provider_class,
      isRefundable: rawFlight.refundable,
      validatingCarrier: rawFlight.validating_carrier,
      services: FlightServiceDetailsSerializer.serializeKeyed(
        rawFlight.services
      ),
    });
  }
  static serializeMany(rawFlights: RawFlight[]) {
    return rawFlights?.length
      ? rawFlights.map((rawFlight) => FlightSerializer.serialize(rawFlight))
      : [];
  }
}

export class FlightItenerarySerializer {
  constructor(flightItenerary: FlightItenerary) {
    Object.assign(this, flightItenerary);
  }

  static serialize(rawFlightItenerary: RawFlightItenerary) {
    return new FlightItenerarySerializer({
      ...rawFlightItenerary,
      arrivalDate: rawFlightItenerary.arr_date,
      carrierName: rawFlightItenerary.carrier_name,
      departureDate: rawFlightItenerary.dep_date,
      dirIndex: rawFlightItenerary.dir_index,
      isMeta: rawFlightItenerary.is_meta,
      isRefundable: rawFlightItenerary.refundable,
      price: {
        currency: rawFlightItenerary.price.currency,
        amount: rawFlightItenerary.price.amount,
        priceRaw: rawFlightItenerary.price.price_raw,
      },
      segments: FlightSegmentSerializer.serializeMany(
        rawFlightItenerary.segments
      ) as FlightSegment[],
      travelTime: rawFlightItenerary.traveltime,
      allowedOffers: rawFlightItenerary.allowed_offers,
    });
  }

  static serializeMany(
    rawIteneraries: RawFlightItenerary[]
  ): FlightItenerary[] {
    return rawIteneraries?.length
      ? rawIteneraries.map(
          (rawItenerary) =>
            FlightItenerarySerializer.serialize(rawItenerary) as FlightItenerary
        )
      : [];
  }
}

export class FlightSegmentSerializer {
  constructor(flightSegment: FlightSegment) {
    Object.assign(this, flightSegment);
  }

  static serialize(rawFlightSegment: RawFlightSegment) {
    return new FlightSegmentSerializer({
      ...rawFlightSegment,
      airportDestination: rawFlightSegment.airport_dest,
      airportDestinationTerminal: rawFlightSegment.airport_dest_terminal,
      airportOrigin: rawFlightSegment.airport_origin,
      airportOriginTerminal: rawFlightSegment.airport_origin_terminal,
      arrivalTerminal: rawFlightSegment.arr_terminal,
      arrivalTime: rawFlightSegment.arr_time,
      arrivalTimeISO: rawFlightSegment.arr_time_iso,
      baggageOptions: rawFlightSegment.baggage_options,
      carrierName: rawFlightSegment.carrier_name,
      departureTerminal: rawFlightSegment.dep_terminal,
      departureTime: rawFlightSegment.dep_time,
      departureTimeISO: rawFlightSegment.dep_time_iso,
      destination: rawFlightSegment.dest,
      destinationCode: rawFlightSegment.dest_code,
      fareBasisCode: rawFlightSegment.fare_basis_code,
      fareSeats: rawFlightSegment.fare_seats,
      flightNumber: rawFlightSegment.flight_num,
      originCode: rawFlightSegment.origin_code,
      stopLocations: rawFlightSegment.stop_locations,
      services: FlightServiceDetailsSerializer.serialize(
        rawFlightSegment.services
      ) as FlightServiceDetails,
    });
  }

  static serializeMany(rawSegments: RawFlightSegment[]): FlightSegment[] {
    return rawSegments?.length
      ? rawSegments.map(
          (rawSegment) =>
            FlightSegmentSerializer.serialize(rawSegment) as FlightSegment
        )
      : [];
  }
}

export class FlightServiceDetailsSerializer {
  constructor(FlightServiceDetails: FlightServiceDetails) {
    Object.assign(this, FlightServiceDetails);
  }
  static serialize(rawFlightService: RawFlightServiceDetails) {
    return new FlightServiceDetailsSerializer({
      ...rawFlightService,
      fullDescription: rawFlightService.full_description,
      altText: rawFlightService.alt_text,
    });
  }

  static serializeKeyed(
    rawServices: Record<string, RawFlightServiceDetails>
  ): Record<string, FlightServiceDetails> {
    return Object.keys(rawServices).reduce(
      (acc: Record<string, FlightServiceDetails>, key) => {
        acc[key] = FlightServiceDetailsSerializer.serialize(
          rawServices[key]
        ) as FlightServiceDetails;
        return acc;
      },
      {}
    );
  }
}
