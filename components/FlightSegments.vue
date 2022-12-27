<template>
  <div class="flex">
    <div>
      <div>{{ departure.date }}</div>
      <div class="text-2xl">{{ departure.time }}</div>
    </div>
    <div>
      {{ firstSegment.originCode }}
    </div>
    <div>
      <span class="mx-2"> {{ flightDuration }} </span>
      <div></div>
    </div>
    <div>
      {{ diff }}
    </div>
    <div>
      <div>{{ arrival.date }} <span class="text-xs">+1 {{ differenceInDays }} </span></div>
      <div class="text-2xl">{{ arrival.time }}</div>
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
});

const firstSegment = computed(() => {
  const { segments } = props;
  return segments[0];
});
const lastSegment = computed(() => {
  const { segments } = props;
  return segments[segments.length - 1];
});

const diff = () => {
  const { segments } = props;
  const first = segments[0];
  const last = segments[segments.length - 1];
  const firstDate = new Date(first.departureTime);
  const lastDate = new Date(last.arriveTime);
  const diff = lastDate.getDate() - firstDate.getDate();
  return diff;
}

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
  const { arriveTime } = lastSegment.value;
  const d = arriveTime.split(" ");
  const time = d.pop();
  const date = d.join(" ");
  return {
    date,
    time,
  };
});
</script>
