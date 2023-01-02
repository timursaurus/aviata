<template>
  <div class="flex">
    <div class="mx-4">
      <div class="text-sm">{{ departure.date }}</div>
      <div class="text-3xl">{{ departure.time }}</div>
    </div>
    <div>
      <div class="flex justify-between">
        <!-- Origin (from) -->
        <span class="text-[#B9B9B9] text-sm">
          {{ firstSegment.originCode }}
        </span>
        <span class="text-base">{{ flightDuration }} </span>
        <!-- Destination (to) -->
        <span class="text-[#B9B9B9] text-sm">
          {{ lastSegment.destinationCode }}
        </span>
      </div>
      <div class="flex justify-center">
        <flight-timeline-icon />
      </div>
      <!-- Through -->
      <div class="text-sm flex justify-center">
        <span
          class="text-[#FF9900]"
          v-if="firstSegment.originCode !== lastSegment.originCode"
        >
          Через г. {{ lastSegment.origin }}
          <span v-if="layoverTime > 0">, {{ layoverDuration }}</span>
        </span>
      </div>
    </div>
    <div></div>
    <div class="mx-4">
      <div class="text-sm">
        {{ arrival.date
        }}<span v-if="timeDiff > 0" class="text-xs text-[#FF3724]">
          + {{ timeDiff }}
        </span>
      </div>
      <div class="text-3xl">{{ arrival.time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FlightSegment } from "~~/types/flight";

const props = defineProps({
  segments: {
    type: Array as PropType<FlightSegment[]>,
    required: true,
  },
  travelTime: {
    type: Number,
    required: true,
  },
  layovers: {
    type: Array as PropType<number[]>,
    required: true,
  },
});

const timeDiff = computed(() => {
  const firstSegmentArrival = new Date(
    firstSegment.value.arrivalTimeISO
  ).getDate();
  const lastSegmentDeparture = new Date(
    lastSegment.value.departureTimeISO
  ).getDate();
  return lastSegmentDeparture - firstSegmentArrival;
});

const layoverDuration = computed(() => {
  const hours = Math.floor(layoverTime.value / 3600);
  const minutes = Math.floor((layoverTime.value - hours * 3600) / 60);
  if (hours === 0) {
    return `${minutes} мин`;
  }
  if (minutes === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${minutes} м`;
});

const layoverTime = computed(() => {
  const { layovers } = props;
  if (layovers.length === 0) {
    return 0;
  }
  return layovers.reduce((acc, curr) => acc + curr, 0);
});

const firstSegment = computed(() => {
  const { segments } = props;
  return segments[0];
});
const lastSegment = computed(() => {
  const { segments } = props;
  return segments[segments.length - 1];
});

const flightDuration = computed(() => {
  const { travelTime } = props;
  const hours = Math.floor(travelTime / 3600);
  const minutes = Math.floor((travelTime - hours * 3600) / 60);
  if (hours === 0) {
    return `${minutes} мин`;
  }
  if (minutes === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${minutes} м`;
});

const departure = computed(() => {
  const { departureTime } = firstSegment.value;
  const d = departureTime.split(" ");
  const time = d.pop();
  const date = d.join(" ");
  return {
    date,
    time,
  };
});

const arrival = computed(() => {
  const { arrivalTime } = lastSegment.value;
  const d = arrivalTime.split(" ");
  const time = d.pop();
  const date = d.join(" ");
  return {
    date,
    time,
  };
});
</script>
