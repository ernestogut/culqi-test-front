<template>
  <div class="flex flex-col gap-8">
    <div class="row">
      <div class="div col-10">
        <Input name="searchCard" label="Buscar tarjeta por token" placeholder="ej. 0ae8dW2FpEAZlxlz" v-model="token" />
      </div>
      <div class="col-2 flex items-end">
        <button class="button" @click="findCard">Buscar</button>
      </div>
      <InputError :error="error" v-if="error" />
    </div>
    <div class="row gap-y-7">
      <div class="col-12">
        <Input name="cardNumber" label="Numero de tarjeta" v-model="card.cardNumber" :mask="'#### #### #### ####'"
          placeholder="ej. 1234 5678 9123 0000" disabled />
      </div>
      <div class="col-6">
        <Input type="number" v-model="card.expirationMonth" label="Month Exp. (MM)" :mask="'##'" disabled />
      </div>
      <div class="col-6">
        <Input type="number" v-model="card.expirationYear" label="Year Exp. (YY)" :mask="'##'" disabled />
      </div>
      <div class="col-12">
        <Input name="email" label="Correo electronico" v-model="card.email" placeholder="ej. ernesto@gmail.com"
          disabled />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ComputedRef, computed, ref, onMounted } from "vue";
import { useCardStore } from "../../store/card.store";
import { useAuthStore } from "../../store/auth.store";
import { useAppStore } from "../../store/app.store";
import { Card } from "../../interfaces/card";
import CardService from "../../services/card.service";
import Input from "../commons/Input.vue";
import InputError from "../commons/InputError.vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const authStore = useAuthStore();
const cardStore = useCardStore();
const appStore = useAppStore();
const router = useRouter();
const token = ref('');
const error = ref('');
const validations = {
  token: { required },
};
const v$ = useVuelidate(validations, { token });
const card: ComputedRef<Card> = computed(() => cardStore.card);

onMounted(() => {
  cardStore.resetCard();
})

const resetErrors = () => {
  error.value = '';
  v$.value.$reset();
}

const findCard = async () => {
  try {
    const result = await v$.value.$validate();
    error.value = v$.value.token.required.$message;
    if (!result) return;
    resetErrors();
    appStore.addPreloader();
    const { data: card } = await CardService.findCardByToken(token.value, authStore.currentUser.shop.privateKey);
    const cardFound: Card = {
      cardNumber: card.cardNumber.toString(),
      expirationMonth: card.expirationMonth,
      expirationYear: card.expirationYear.toString().slice(2),
      cvv: '',
      email: card.email,
    }
    cardStore.setCard(cardFound);
    appStore.removePreloader()
  } catch (error: any) {
    if (error.response.status === 400) {
      const errorMessage = error.response.data.error
      const { isConfirmed } = await appStore.showErrorSwal('Error', errorMessage, 'error', {
        confirmButtonText: 'Ir al Generador de Token',
        confirmButtonColor: '#ff6f16',

      })
      if (isConfirmed) {
        router.push({ name: 'token-generator' })
      }
    } else {
      appStore.showErrorSwal('Error', 'Ha ocurrido un error, intente nuevamente', 'error')
    }
    appStore.removePreloader()
  }
}
</script>