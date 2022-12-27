<template>
  <div class="flex mb-4 drop-shadow-md">
    <!-- Flight Details -->
    <section class="bg-white rounded-tl-md rounded-bl-md">
      <!-- Itineraries -->
      <flight-itineraries :itineraries="flight.itineraries" />
      <!-- Bottom Links -->
      <div class="flex">
        <a
          v-for="link in bottomLinks"
          class="text-[#7284E4] block mr-2 text-xs border-dashed no-underline border-0 border-b-1 w-fit cursor-pointer"
          :href="link.href"
          >{{ link.text }}</a
        >
        <span
          v-if="flight.isRefundable"
          class="flex text-[#707276] items-center"
        >
          <non-refundable-icon />
          <span> невозвратный </span>
        </span>
      </div>
    </section>
    <!-- Flight Actions -->
    <section class="bg-[#F5F5F5] px-5 rounded-tr-md rounded-br-md">
      <div class="my-4 flex items-baseline justify-center">
        <span class="text-2xl"> {{ flight.price }} </span>
        <span class="text-lg"> {{ flightCurrency }} </span>
      </div>
      <div>
        <button
          type="button"
          class="rounded cursor-pointer w-full bg-[#55BB06] border-0 text-white font-bold text-lg flex justify-center items-center xl:mb-2 hover:opacity-90 duration-200 transition-transform"
        >
          Выбрать
        </button>
        <div>
          <p class="text-[#707276]">Цена за всех пассажиров</p>
        </div>
        <div class="flex items-center">
          <p>
            {{ flightService }}
          </p>
          <button
            class="flex cursor-pointer justify-center border-0 items-center rounded-sm bg-[#EAF0FA] hover:opacity-90 text-[#5763B3]"
          >
            + Добавить багаж
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { CURRENCIES_UNICODE } from "~~/constants/currency";
import { Flight } from "~~/types/flight";
import FlightItineraries from "./FlightItineraries.vue";

const props = defineProps({
  flight: {
    type: Object as PropType<Flight>,
    required: true,
  },
});

const flightService = computed(() => {
  const { services } = props.flight;
  const serviceKey = Object.keys(services)[0];
  if (!serviceKey) {
    return null;
  }
  if (serviceKey === "0PC") {
    return "Нет багажа";
  }
  return services[serviceKey].value;
});

const flightCurrency = computed(() => {
  const { currency } = props.flight;

  // const intl = new Intl.NumberFormat("ru-RU", {
  //   style: "currency",
  //   currency: currency,
  //   maximumSignificantDigits: 3,
  // }).format(priceRaw)

  return ` ${CURRENCIES_UNICODE[currency] || currency}`;
});

const bottomLinks = ref([
  {
    text: "Детали перелета",
    href: "#",
  },
  {
    text: "Условия тарифа",
    href: "#",
  },
]);
</script>
