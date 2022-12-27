<template>
  <div class="flex items-center">
    <div class="flex gap-x-2 items-center">
      <img
        :src="carrierLogo"
        width="16"
        loading="lazy"
        :alt="itinerary.carrierName"
      />
      <span> {{ itinerary.carrierName }} </span>
    </div>
    <div class="flex">
      <flight-segments
        :travel-time="itinerary.travelTime"
        :segments="itinerary.segments"
      />
    </div>
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
    const { carrierName, travelTime, carrier, segments } = itinerary;

    return {
      carrierName,
      travelTime,
      carrier,
      segments,
    };
  })[0];
});
</script>
