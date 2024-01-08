<template>
  <div class="card-text" v-if="length">
    <template v-for="(_, idx) in calculate.data">
      <template v-for="(char, i) in chars">
        <p v-if="calculate.isActive(idx, i)">{{ char }}</p>
        <template v-else />
      </template>
    </template>
  </div>
  <template v-else />
</template>
<script setup lang="ts">
import { computed } from "vue";
type Props = {
  length: number;
  value?: string;
  defaultValue?: string;
  chars: string[];
};

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "0000",
});

const calculate = computed(() => {
  const _value = (props.value || "") + props.defaultValue.slice(props.value?.length);
  const data = Array(props.length).fill(0);

  const isActive = (idxValue: number, idx: number) => {
    if (props.chars.indexOf(_value[idxValue]?.toUpperCase()) === -1 && idx === 0) return true;
    return props.chars.indexOf(_value[idxValue]?.toUpperCase()) === idx;
  };

  return { data, isActive };
});
</script>
<style scoped>
.card-text {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  column-gap: 0.05rem;
}

.card-text p {
  text-align: center;
  animation: fadeIn 0.35s ease-out;
}

@media (min-width: 768px) {
  .card-text {
    column-gap: 0.1rem;
  }
}

@media (min-width: 1024px) {
  .card-text {
    column-gap: 0.125rem;
  }
}

@media (min-width: 1440px) {
  .card-text {
    column-gap: 0.25rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
