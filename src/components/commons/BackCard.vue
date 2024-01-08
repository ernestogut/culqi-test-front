<template>
  <div class="card card-back">
    <div class="card-back__cvc">
      <Text :length="getCardBrand(card.cardNumber as string) == 'American Express' ? 4 : 3" :value="card.cvv.toString()"
        :defaultValue="'000'" :chars="alphanumerics" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Text from "./Text.vue";
import { useCardStore } from "../../store/card.store";
import { alphanumerics, getCardBrand } from "../../utils";
const cardStore = useCardStore();
const card = computed(() => cardStore.card);
</script>
<style scoped>
.card-back {
  color: var(--lightGrayishViolet);
  background: url("/assets/images/bg-card-back.png") no-repeat 50% / cover;
  position: relative;
  transform: translate(12.5%, -60%);
  position: relative;
}

.card-back__cvc {
  position: absolute;
  top: 41%;
  right: 11%;
  display: flex;
  column-gap: 0.075rem;
  color: white;
  letter-spacing: 2px;
  font-size: 0.6rem;
}

@media (min-width: 768px) {
  .card-back {
    transform: translate(35%, -65%);
  }

  .card-back__cvc {
    top: 42%;
  }
}

@media (min-width: 1024px) {
  .card-back {
    transform: translateX(20%);
  }

  .card-back__cvc {
    top: 44%;
    right: 12%;
    font-size: 0.75rem;
  }
}

@media (min-width: 1440px) {
  .card-back {
    transform: translateX(50%);
  }

  .card-back__cvc {
    top: 44.25%;
  }
}
</style>