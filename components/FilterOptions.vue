<template>
  <div class="bg-[#F5F5F5] rounded-md py-4 mb-4">
    <div class="flex items-center justify-between mb-4">
      <span class="ml-4 text-lg font-bold">{{ header }}</span>
      <button class="bg-transparent border-0" @click="resetCurrentFilter">
        <filter-button-icon
          class="text-[#C4C4C4] hover:text-[#7284E4] duration-100"
        />
      </button>
    </div>

    <ul class="list-none p-0 m-0 max-h-[320px] overflow-y-scroll">
      <li
        v-for="(option, _) in options"
        :key="_"
        class="px-4 flex items-center hover:bg-[#EBEBEB]"
      >
        <input
          v-model="selected"
          :id="option.value"
          :value="option"
          type="checkbox"
        />
        <label
          :for="option.value"
          class="pl-2 whitespace-nowrap py-2 w-full h-full"
        >
          {{ option.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const selected = ref<Option[]>([]);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  optionKey: {
    type: String,
    required: true,
  },
});

watch(selected, (newVal) => {
  const { optionKey } = props;

  if (newVal.find((v) => v.value === "_all")) {
    useRouter().replace({
      query: { ...useRoute().query, [optionKey]: undefined },
    });
    return;
  }

  const newQuery = { [optionKey]: newVal.map((v) => v.value).join(",") };
  if (newVal.length === 0) {
    useRouter().replace({
      query: { ...useRoute().query, [optionKey]: undefined },
    });
    return;
  }
  useRouter().replace({ query: { ...useRoute().query, ...newQuery } });
});

onMounted(() => {
  if (useRoute().query[props.optionKey]) {
    selected.value = props.options.filter((option) => {
      const query = useRoute().query[props.optionKey] as string;
      if (query) {
        return query.split(",").includes(option.value);
      }
    });
  }
});

const resetCurrentFilter = () => {
  const { optionKey } = props;
  selected.value = [];
  useRouter().replace({
    query: { ...useRoute().query, [optionKey]: undefined },
  });
};
</script>
