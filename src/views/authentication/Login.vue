<template>
    <div class="flex justify-start p-10 mb-12  h-fit w-fit">
        <CulqiLogo />
    </div>
    <div class="flex justify-between items-start p-10">
        <div class="flex justify-start items-center flex-col w-[65%]">
            <span class="text-[50px] font-bold">¡Bienvenido de nuevo!</span>
            <p class="text-[20px] my-5">Accede a tu cuenta</p>
            <PhoneCardIcon />
        </div>
        <div class="w-[35%] px-[100px]">
            <div class="flex flex-col justify-center items-center">
                <span class="text-[30px] font-bold">Ingresa tus datos</span>
                <p class="text-[15px] my-5">
                    Ingresa tu usuario y contraseña para acceder
                </p>
            </div>
            <div class="row gap-y-5">
                <div class="col-12">
                    <Input name="username" label="Usuario" v-model="username" placeholder="ej. ernestogut"
                        @keyup="onKeyUp" />
                </div>
                <div class="col-12">
                    <Input name="password" label="Contraseña" v-model="password" type="password" @keyup="onKeyUp" />
                </div>
                <div>
                    <button class="button" @click="login">Iniciar sesión</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '../../services/auth.service';
import { User } from '../../interfaces/user'
import { AxiosResponse } from 'axios';
import CulqiLogo from '../../components/icons/CulqiLogo.vue';
import PhoneCardIcon from '../../components/icons/PhoneCardIcon.vue';
import Input from '../../components/commons/Input.vue';
import InputError from '../../components/commons/InputError.vue';
import { useAppStore } from '../../store/app.store';

const appStore = useAppStore()
const username = ref('')
const password = ref('')

const router = useRouter()

const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        login()
    }
}

const login = async () => {

    try {
        appStore.addPreloader()
        const { data: user }: AxiosResponse<User> = await AuthService.login(username.value, password.value)
        localStorage.setItem('userData', JSON.stringify(user))
        localStorage.setItem('privateKey', user.shop.privateKey)
        appStore.removePreloader()
        router.push({ name: 'token-generator' })
    } catch (error: any) {
        if (error.response.status === 400) {
            const errorMessage = error.response.data.error
            appStore.showErrorSwal('Error', errorMessage, 'error')
        } else {
            appStore.showErrorSwal('Error', 'Ha ocurrido un error, intente nuevamente', 'error')
        }
        appStore.removePreloader()
    }
}


</script>