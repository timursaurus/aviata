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
      <div v-if="filteredFlights?.length" class="pt-8">
        <flight-card
          :flight="flight"
          v-for="(flight, _) in filteredFlights"
          :key="_"
        />
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
import { useFilterFlights } from "@/composables/flight";

useHead({
  title: "Aviata",
  bodyAttrs() {
    return {
      class: "bg-[#D7D7D7] p-0 m-0",
    };
  },
});

const { tariffOptions, airlineOptions, filteredFlights } = useFilterFlights();
</script>
