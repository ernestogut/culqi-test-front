<template>
  <div class="main">
    <div class="flex justify-around items-center p-10 w-full">
      <div>
        <router-link :to="{ name: 'token-generator' }"
          :class="{ 'active-link': ['token-generator', 'token-generator-finish'].includes($route.name as string) }"
          class="mr-5" exact>
          Generador de Token
        </router-link>

        <router-link :to="{ name: 'card-info' }" :class="{ 'active-link': $route.name === 'card-info' }" exact class="mr-5">
          Informacion de la tarjeta
        </router-link>

        <span class="cursor-pointer" @click="logout">
          {{ currentUser.username }} (Cerrar Sesion)
        </span>
      </div>
      <div>
        <CulqiLogo />
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import CulqiLogo from "../components/icons/CulqiLogo.vue";
import { useAuthStore } from "../store/auth.store";

const authStore = useAuthStore();


const currentUser = computed(() => authStore.currentUser);

const logout = () => {
  authStore.logout();
}

</script>

<style scoped>
.main {
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active-link {
  color: #ff6f16;
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 100%;
  padding: 0 1.25rem;
  margin-bottom: 300px;
}

@media (min-width: 768px) {
  .content {
    padding: 0;
    width: calc(var(--mobile) * 1.5);
  }
}

@media (min-width: 1024px) {
  .content {
    width: 70%;
  }
}

@media (min-width: 1440px) {
  .content {
    width: 50%;
  }
}
</style>
