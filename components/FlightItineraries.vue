<template>
  <div class="sm:flex sm:px-4 py-8 items-center justify-between  ">
    <div class="flex text-xl pb-8 sm:pb-0 gap-x-2 items-center">
      <img
        :src="carrierLogo"
        width="40"
        loading="lazy"
        :alt="itinerary.carrierName"
      />
      <span class="truncate text-base " > {{ itinerary.carrierName }} </span>
    </div>
    <div class="flex">
      <flight-segments
        :travel-time="itinerary.travelTime"
        :segments="itinerary.segments"
        :layovers="itinerary.layovers"
      />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Flight } from "~~/types/flight";

const props = defineProps({
  itineraries: {
    type: Array as PropType<Flight["itineraries"]>,
    required: true,
  },
});

const carrierLogo = computed(
  () =>
    `https://aviata.kz/static/airline-logos/80x80/${itinerary.value.carrier}.png`
);

const itinerary = computed(() => {
  const { itineraries } = props;
  return itineraries.flat().map((itinerary) => {
    const { carrierName, travelTime, carrier, segments, layovers } = itinerary;

    return {
      carrierName,
      travelTime,
      carrier,
      segments,
      layovers,
    };
  })[0];
});
</script>
