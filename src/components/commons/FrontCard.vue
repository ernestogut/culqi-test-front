
<template>
  <div class="card card-front">
    <div class="card-front__content">
      <div class="card-front__logo">
        <component :is="cards[componentName]" v-if="componentName != 'Desconocido'" class="w-[70px] h-[48px]" />
      </div>
      <div class="card-front__details">
        <CardNumber :cardNumber="card.cardNumber.toString()" />
        <div class="card-front__footer">
          <CardEmail :email="card.email" />
          <CardDate :expiration="{ months: card.expirationMonth, years: card.expirationYear }" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { Card } from "../../interfaces/card";
import CardEmail from "./CardEmail.vue";
import CardNumber from "./CardNumber.vue";
import CardDate from "../commons/CardDate.vue";
import { useCardStore } from "../../store/card.store";
import { getCardBrand } from "../../utils";
import VisaLogo from "../icons/VisaLogo.vue";
import MastercardLogo from "../icons/MastercardLogo.vue";
import AmexLogo from "../icons/AmexLogo.vue";

const cards = {
  VisaLogo,
  MastercardLogo,
  AmexLogo,
};
type CardBrand = "VisaLogo" | "MastercardLogo" | "AmexLogo" | "Desconocido";
const componentName: ComputedRef<CardBrand> = computed(() => {
  const brand = getCardBrand(card.value.cardNumber as string);

  if (brand === "Visa") return "VisaLogo";
  if (brand === "Mastercard") return "MastercardLogo";
  if (brand === "American Express") return "AmexLogo";
  else return "Desconocido";
});


const cardStore = useCardStore();
const card: ComputedRef<Card> = computed(() => cardStore.card);
</script>

<style scoped>
.card-front {
  color: var(--lightGrayishViolet);
  background: linear-gradient(225deg,
      hsl(22deg 83% 53%) 0%,
      hsl(18deg 73% 54%) 6%,
      hsl(13deg 63% 54%) 11%,
      hsl(6deg 53% 54%) 17%,
      hsl(358deg 44% 53%) 23%,
      hsl(348deg 40% 49%) 28%,
      hsl(337deg 40% 45%) 34%,
      hsl(324deg 41% 41%) 40%,
      hsl(309deg 41% 37%) 46%,
      hsl(290deg 44% 36%) 51%,
      hsl(283deg 34% 39%) 57%,
      hsl(273deg 26% 42%) 62%,
      hsl(257deg 20% 46%) 68%,
      hsl(233deg 17% 47%) 74%,
      hsl(213deg 22% 47%) 79%,
      hsl(198deg 28% 45%) 84%,
      hsl(188deg 37% 43%) 90%,
      hsl(181deg 51% 40%) 95%,
      hsl(178deg 100% 32%) 100%) no-repeat 50% / cover;
  z-index: 1;
  transform: translate(-12.5%, 95%);
}

.card-front__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.card-front__logo {
  width: 20%;
  height: auto;
}

.card-front__details {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.card-front__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 768px) {
  .card-front {
    transform: translate(-35%, 80%);
  }

  .card-front__details {
    row-gap: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .card-front {
    transform: translateX(20%);
  }

  .card-front__content {
    padding: 1.5rem;
  }

  .card-front__details {
    row-gap: 1.25rem;
  }
}

@media (min-width: 1440px) {
  .card-front {
    transform: translateX(30%);
  }
}
</style>