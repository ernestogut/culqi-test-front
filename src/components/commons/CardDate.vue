<template>
  <div class="font-medium md:text-sm flex items-center text-xs gap-1 md:gap-2 card-front__footer-expiration">
    <Text :length="2" :value="expiration.months.toString()" :defaultValue="'00'" :chars="numbers" />
    <span>/</span>
    <Text :length="2" :value="expiration.years.toString()" :defaultValue="'00'" :chars="numbers" />
  </div>
</template>

<script setup lang="ts">
import Text from "./Text.vue";
import { numbers } from "../../utils";
type Props = {
  expiration: {
    months: string;
    years: string;
  };
};
defineProps<Props>();
</script>