<template>
  <div class="font-sans" >
    <pre>
      <flight-card :flight="flight" v-for="(flight, _) in serializedFlights" :key="_" />
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useFetchAirlineLogo } from "./composables/airlines";
import { mockSearchResult } from "./mock";
import { FlightSerializer } from "./models/flight.model";

// const data  = computed(() => FlightSerializer.serialize() )

const mock = computed(() => mockSearchResult.flights);

const foundAirlines = computed<Record<string, string>>(
  () => mockSearchResult.airlines
);

const flights = computed(() => mockSearchResult.flights);

const serializedFlights = computed(() =>
  flights.value.map((f) => FlightSerializer.serialize(f))
);

// const se = computed(() => FlightSerializer.serialize(first.value))

// const se2 = computed(() => FlightSerializer.serializeMany(mock.value))

// const data = computed(() => FlightSerializer.serializeMany(mock.value.flights));

onMounted(async () => {
  const k = await useFetchAirlineLogo("KC");
});
</script>
