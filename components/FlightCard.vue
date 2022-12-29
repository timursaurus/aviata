<template>
  <div class="lg:flex mb-4 drop-shadow-md ">
    <!-- Flight Details -->
    <section
      class="bg-white lg:px-4 md:rounded-tl-md md:rounded-bl-md flex flex-col relative"
    >
      <!-- Itineraries -->
      <flight-itineraries class="lg:min-w-150 " :itineraries="flight.itineraries" />
      <!-- Bottom Links -->
      <div class="flex pb-4 w-full justify-between mt-auto">
        <div class="w-full px-4 flex items-center">
          <a
            v-for="link in bottomLinks"
            class="text-[#7284E4] mr-2 text-xs border-dashed no-underline border-0 border-b-1 w-fit cursor-pointer"
            :href="link.href"
            >{{ link.text }}</a
          >
        </div>
        <div
          v-if="flight.isRefundable"
          class="flex text-[#707276] items-center absolute right-1/2 bottom-4 transform translate-x-1/2"
        >
          <non-refundable-icon />
          <span> невозвратный </span>
        </div>
      </div>
    </section>
    <!-- Flight Actions -->
    <section
      class="bg-[#F5F5F5] px-4 md:rounded-tr-md md:rounded-br-md bg-[#f5f5f5] lg:w-full items-center"
    >
      <div class="lg:my-4 flex items-baseline justify-center">
        <span class="text-2xl"> {{ flight.price }} </span>
        <span class="text-lg mx-1"> {{ flightCurrency }} </span>
      </div>
      <div class="lg:w-full">
        <button
          type="button"
          class="rounded py-2 whitespace-nowrap cursor-pointer w-full bg-[#55BB06] border-0 text-white font-bold text-lg flex justify-center items-center hover:opacity-90 duration-200"
        >
          Выбрать
        </button>
        <div class="flex justify-center">
          <p class="text-[#707276]">Цена за всех пассажиров</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="mx-2">
            {{ flightService }}
          </p>
          <button
            class="flex py-2 mx-2 cursor-pointer justify-center border-0 items-center rounded-sm bg-[#EAF0FA] hover:opacity-90 text-[#5763B3]"
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

  return `${CURRENCIES_UNICODE[currency] || currency}`;
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
