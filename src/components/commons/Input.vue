<template>
  <div class="input-form">
    <label :for="name">{{ label }}</label>
    <input :type="type" :id="name" :name="name" :placeholder="placeholder" :value="modelValue" @input="onInput" v-maska
      :data-maska="mask" :disabled="disabled" @keyup="onKeyup" />
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska'
type Props = {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  modelValue?: string | number;
  mask?: string;
  disabled?: boolean;
};

type Emits = {
  "update:modelValue": [string];
  "keyup": [KeyboardEvent];
};

type UpdateModelValue = (e: "update:modelValue", value: string) => void;

// Passing props
defineProps<Props>();
const emit = defineEmits<Emits>();

const onInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit("update:modelValue", inputValue);
};

const onKeyup = (event: KeyboardEvent) => {
  emit("keyup", event);
};

</script>
<style scoped>
::-webkit-inner-spin-button {
  display: none;
}

input:disabled {
  background-color: rgb(255 255 255 / 30%);
}

.input-form {
  display: flex;
  flex-direction: column;
  grid-column: span 4;
}

.input-form:nth-of-type(3),
.input-form:nth-of-type(4) {
  grid-column: span 2;
}

.expire {
  display: flex;
  column-gap: 0.5rem;
}

.error-input {
  border-color: var(--red);
}

.error-input:focus,
.error-input:active {
  border-color: var(--red);
}

.error-msg {
  color: var(--red);
  font-size: 0.7rem;
  font-weight: bold;
  line-height: 1.5rem;
}

label {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: 1px;
}

input {
  border: 1px solid var(--lightGrayishViolet);
  font-weight: bold;
}

input::placeholder {
  color: var(--lightGrayishViolet);
}

input:focus,
input:active {
  border-color: var(--darkGrayishViolet);
  outline: none;
}
</style>