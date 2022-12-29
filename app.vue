<template>
  <div
    class="font-sans min-h-screen md:min-w-screen-sm lg:min-w-screen-lg md:flex justify-center"
  >
    <div class="mx-2">
      <filters-container class="pt-8 sticky top-0">
        <filter-options
          header="Опции тарифа"
          :options="tariffOptions"
          option-key="tariff"
        />
        <filter-options
          header="Авиакомпании"
          :options="airlineOptions"
          option-key="airline"
        />
      </filters-container>
    </div>
    <div class="md:max-w-screen-lg md:w-screen-lg mx-2">
      <div v-if="flights?.length" class="pt-8">
        <flight-card :flight="flight" v-for="(flight, _) in flights" :key="_" />
      </div>
      <div v-else class="max-w-full py-10">
        <span class="text-lg">
          По вашему запросу ничего не найдено. Попробуйте изменить параметры
          поиска.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockSearchResult } from "./mock";
import { FlightSerializer } from "./models/flight.model";
import { Flight } from "./types/flight";

useHead({
  title: "Aviata",
  bodyAttrs() {
    return {
      class: "bg-[#D7D7D7] p-0 m-0",
    };
  },
});


const rawFlights = computed(() => mockSearchResult.flights);
const serializedFlights = computed(() =>
  rawFlights.value.map((f) => FlightSerializer.serialize(f))
);

//FIXME: move to composable
const flights = computed(() => {
  const airline = useRoute().query.airline;
  const tariff = useRoute().query.tariff;

  const airlineFilters = typeof airline === "string" ? airline.split(",") : [];
  const tariffiFilters = typeof tariff === "string" ? tariff.split(",") : [];

  const tariffs: Record<string, Function> = {
    directOnly: (f: Flight) => f.itineraries[0][0].layovers.length === 0,
    baggageOnly: (f: Flight) => !f.services?.["0PC"],
    refundableOnly: (f: Flight) => f.isRefundable,
  };

  if (airline && tariff) {
    return serializedFlights.value.filter((f) => {
      const airlineIncluded = airlineFilters.includes(f.validatingCarrier);
      return airlineIncluded && tariffiFilters.some((t) => tariffs[t](f));
    });
  }

  if (airline) {
    return serializedFlights.value.filter((f) =>
      airlineFilters.includes(f.validatingCarrier)
    );
  }

  if (tariff) {
    return serializedFlights.value.filter((f) =>
      tariffiFilters.some((t) => tariffs[t](f))
    );
  }

  return serializedFlights.value;
});

const airlineOptions = ref<Option[]>([
  {
    label: "Все",
    value: "_all",
  },
  {
    label: "Air Astana",
    value: "KC",
  },
  {
    label: "Aeroflot",
    value: "SU",
  },
  {
    label: "Uzbekistan Airways",
    value: "HY",
  },
  {
    label: "Emirates",
    value: "EK",
  },
  {
    label: "HR",
    value: "HR",
  },
  {
    label: "Flydubai",
    value: "FZ",
  },
  {
    label: "S7 Airlines",
    value: "S7",
  },
  {
    label: "Lufthansa",
    value: "LH",
  },
  {
    label: "Air Baltic",
    value: "BT",
  },
  {
    label: "China Southern Airlines",
    value: "CZ",
  },
  {
    label: "Belavia",
    value: "B2",
  },
  {
    label: "SCAT Airlines",
    value: "DV",
  },
  {
    label: "Turkish Airlines",
    value: "TK",
  },
]);

const tariffOptions = ref<Option[]>([
  {
    label: "Только прямые",
    value: "directOnly",
  },
  {
    label: "Только с багажом",
    value: "baggageOnly",
  },
  {
    label: "Только возвратные",
    value: "refundableOnly",
  },
]);
</script>
