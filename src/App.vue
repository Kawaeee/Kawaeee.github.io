<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Profile from './components/Profile.vue'
import CustomParticles from './components/Particle.vue'

const profileName = "Kasidech Chumkun"
const profileDescription = "Data Scientist at Osotspa"
</script>

<template>
  <header>
    <img alt="Kawaeee's PFP" class="logo" src="/src/assets/profile/icon-postelb.png" width="125" height="125" />

    <div class="wrapper">
      <Profile v-bind:name=profileName v-bind:description=profileDescription />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About me</RouterLink>
        <RouterLink to="/experience">Experiences</RouterLink>
        <RouterLink to="/project">Projects</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <CustomParticles/>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component v-bind:key="$route.path" v-bind:is="Component"/>
      </transition>
    </RouterView>
  </main>

</template>

<style scoped>

.fade-enter-active
{
  animation: fade 0.33s;
}

.fade-leave-active
{
  animation: fade 0.33s reverse;
}

@keyframes fade 
{
  from
  {
      opacity: 0%;
  }
  to
  {
      opacity: 100%;
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.5rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 3);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0 0 8px;
    margin-top: 1rem;
  }
}
</style>
