<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { useFetchAirlineLogo } from './composables/airlines';

onMounted(async () => {

  const k = await useFetchAirlineLogo("KC")
})

</script>