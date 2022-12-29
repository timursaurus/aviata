<template>
  <div>
    <slot />
    <div>
      <button
        @click="filtersReset"
        class="text-[#7284E4] border-[#7284E4] bg-transparent block mr-2 text-xs border-dashed no-underline border-0 border-b-1 w-fit cursor-pointer"
      >
        Сбросить все фильтры
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
function filtersReset() {
  useRouter().replace({ query: {} });
}
</script>
