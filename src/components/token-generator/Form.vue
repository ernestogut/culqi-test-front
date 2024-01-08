<template>
  <div class="flex flex-col gap-8">
    <div class="row gap-y-7">
      <div class="col-12">
        <Input name="cardNumber" label="Numero de tarjeta" v-model="card.cardNumber" :mask="'#### #### #### ####'"
          placeholder="ej. 1234 5678 9123 0000" />
        <InputError :error="v$.cardNumber.$errors[0]?.$message" v-if="v$.cardNumber.$errors[0]?.$message" />
      </div>
      <div class="col-6">
        <Input type="number" v-model="card.expirationMonth" label="Month Exp. (MM)" :mask="'##'" />
        <InputError :error="v$.expirationMonth.$errors[0]?.$message" v-if="v$.expirationMonth.$errors[0]?.$message" />
      </div>
      <div class="col-6">
        <Input type="number" v-model="card.expirationYear" label="Year Exp. (YY)" :mask="'##'" />
        <InputError :error="v$.expirationYear.$errors[0]?.$message" v-if="v$.expirationYear.$errors[0]?.$message" />
      </div>
      <div class="col-6">
        <Input type="number" name="cvc" v-model="card.cvv" label="CVV" placeholder="ej. 123" :mask="'####'" />
        <InputError :error="v$.cvv.$errors[0]?.$message" v-if="v$.cvv.$errors[0]?.$message" />
      </div>
      <div class="col-6">
        <Input name="email" label="Correo electronico" v-model="card.email" placeholder="ej. ernesto@gmail.com" />
        <InputError :error="v$.email.$errors[0]?.$message" v-if="v$.email.$errors[0]?.$message" />
      </div>
    </div>
    <button class="button" @click="onSubmit">Confirmar</button>
  </div>
</template>
<script setup lang="ts">
import { ComputedRef, computed, onMounted } from "vue";
import { useCardStore } from "../../store/card.store";
import { useAuthStore } from "../../store/auth.store";
import { useTokenStore } from "../../store/token.store";
import { useAppStore } from "../../store/app.store";
import { useRouter } from "vue-router";
import { Card } from "../../interfaces/card";
import CardService from "../../services/card.service";
import Input from "../commons/Input.vue";
import InputError from "../commons/InputError.vue";
import { getCardBrand } from "../../utils";


type SubmitButtonEvent = (e: "onSubmitButton") => void;
const emit = defineEmits<SubmitButtonEvent>();
const authStore = useAuthStore();
const tokenStore = useTokenStore();
const cardStore = useCardStore();
const appStore = useAppStore();
const router = useRouter();
const v$ = cardStore.v$;

const card: ComputedRef<Card> = computed(() => cardStore.card);
const cvvValido = computed(() => {
  const brand = getCardBrand(card.value.cardNumber as string);
  if (brand === "American Express") {
    return '4532'
  } else {
    return '123'
  }
})
onMounted(() => {
  cardStore.resetCard();
})


const onSubmit = async () => {
  try {
    const result = await v$.$validate();
    if (result) {
      appStore.addPreloader();
      const { data: token } = await CardService.tokenizeCard(
        Number(card.value.cardNumber.toString().replaceAll(' ', '')),
        Number(card.value.cvv),
        card.value.expirationMonth,
        '20' + card.value.expirationYear,
        card.value.email,
        authStore.currentUser.shop.privateKey,
      )
      tokenStore.setToken(token);
      router.push({ name: 'token-generator-finish' })
      v$.$reset();
      appStore.removePreloader()
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      const errorMessage = error.response.data.error
      appStore.showErrorSwal('Error', errorMessage + ` CVV Valido: ${cvvValido.value}`, 'error')
    } else {
      appStore.showErrorSwal('Error', 'Ha ocurrido un error, intente nuevamente', 'error')
    }
    appStore.removePreloader()
  }
};
</script>