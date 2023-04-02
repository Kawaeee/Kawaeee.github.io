<script setup lang="ts">
import About from '../components/About.vue'

const email = "mailto:kawaekc@gmail.com"
const urls = {
  github: "https://github.com/Kawaeee",
  linkedin: "https://www.linkedin.com/in/kasidech-kaw/",
  medium: "https://kawaekc.medium.com/",
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <About v-bind:email=email v-bind:urls=urls></About>
  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
