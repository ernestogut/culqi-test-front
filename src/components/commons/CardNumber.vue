<template>
  <div class="flex text-lg font-bold gap-2 md:gap-3 lg:gap-4 md:text-xl lg:text-2xl">
    <template v-for="item in getNumber">
      <Text :length="4" :value="item.toString()" :chars="numbers" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Text from "./Text.vue";
import { numbers } from "../../utils";
type Props = {
  cardNumber: string;
};
const props = defineProps<Props>();

const getNumber = computed(() => {
  const sections = props.cardNumber.split(" ");
  const remaining = new Array(4 - sections.length).fill(0);
  return [...sections, ...remaining] as string[];
});
</script>