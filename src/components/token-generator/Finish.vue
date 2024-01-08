<template>
  <div class="flex flex-col items-center gap-y-10">
    <img class="w-auto h-auto" src="/assets/images/icon-complete.svg" />
    <div class="text-center">
      <h2 class="text-3xl font-medium text-veryDarkGrayishViolet leading-6 tracking-widest">¡Gracias!</h2> <br>
      <h4 class="text-darkGrayishViolet text-lg font-semibold leading-6">Hemos agregado tu tarjeta a nuestra base de
        datos. A continuacion se te asignara un <strong>token</strong> para que puedas consultar los datos de tu tarjeta
      </h4> <br>
      <h4 class="text-darkGrayishViolet text-lg font-semibold leading-6">{{ token }}</h4>
    </div>
    <button type="button" class="button" @click="reset">Continuar</button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTokenStore } from "../../store/token.store";
import { useCardStore } from "../../store/card.store";
import router from "../../router";
type SubmitButtonEvent = (e: "onSubmitButton") => void;
const emit = defineEmits<SubmitButtonEvent>();
const tokenStore = useTokenStore();
const cardStore = useCardStore();
const token = computed(() => tokenStore.token);
const reset = () => {
  cardStore.resetCard();
  router.push({ name: "card-info" });
};
</script>