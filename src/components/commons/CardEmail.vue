<template>
  <div class="flex text-xs lg:text-sm gap-1 lg:gap-2">
    <Text :length="getEmail.length" :value="getEmail" :defaultValue="getEmail" :chars="alphabets" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Text from "./Text.vue";
import { alphabets } from "../../utils";
type Props = {
  email: string;
};
const props = defineProps<Props>();

const getEmail = computed(() => {
  return props.email
});
</script>

