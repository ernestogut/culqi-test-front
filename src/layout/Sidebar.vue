<template>
  <div class="side">
    <FrontCard />
    <BackCard v-if="['token-generator', 'token-generator-finish'].includes($route.name as string)" />
  </div>
</template>
<script setup lang="ts">
import BackCard from '../components/commons/BackCard.vue';
import FrontCard from '../components/commons/FrontCard.vue';
</script>
<style scoped>
.side {
  display: grid;
  grid-gap: 2rem;
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
  place-content: center;
}
</style>
