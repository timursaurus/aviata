import { FlightSerializer } from "@/models/flight.model";
import { mockSearchResult } from "@/mock";
import { Flight } from "@/types/flight";

const tariffFilters: Record<string, Function> = {
  directOnly: (f: Flight) => f.itineraries[0][0].layovers.length === 0,
  baggageOnly: (f: Flight) => !f.services?.["0PC"],
  refundableOnly: (f: Flight) => f.isRefundable,
};

export function useFilterFlights() {
  const { airlines, flights: rawFlights } = computed(() => mockSearchResult).value;

  const tariffOptions = ref<Option[]>([
    { label: "Только прямые", value: "directOnly" },
    { label: "Только с багажом", value: "baggageOnly" },
    { label: "Только возвратные", value: "refundableOnly" },
  ]);

  const airlineOptions = computed<Option[]>(() => {
    const options = Object.entries(airlines).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
    return [{ label: "Все", value: "_all" }, ...options];
  });

  const serializedFlights = computed(() =>
    rawFlights.map((f) => FlightSerializer.serialize(f) as Flight)
  );

  const filteredFlights = computed(() => {
    const airline = useRoute().query.airline as string
    const tariff = useRoute().query.tariff as string

    const airlineCodes = airline ? airline.split(",") : [];
    const tariffCodes = tariff ? tariff.split(",") : [];

    if (airline && tariff) {
      return serializedFlights.value.filter((f) => {
        const airlineIncluded = airlineCodes.includes(f.validatingCarrier);
        return airlineIncluded && tariffCodes.some((t) => tariffFilters[t](f));
      });
    }

    if (airline) {
      return serializedFlights.value.filter((f) => airlineCodes.includes(f.validatingCarrier));
    }

    if (tariff) {
      return serializedFlights.value.filter((f) => tariffCodes.some((t) => tariffFilters[t](f)));
    }

    return serializedFlights.value;
  });

  return {
    filteredFlights,
    serializedFlights,
    rawFlights,
    airlineOptions,
    tariffOptions,
  };
}
