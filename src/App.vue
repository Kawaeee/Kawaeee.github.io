<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Profile from './components/Profile.vue'

let profileName = "Kasidech Chumkun"
let profileDescription = "Data Scientist at Osotspa"
</script>

<template>
  <header>
    <img alt="Kawaeee's PFP" class="logo" src="src/assets/me/icon-postelb.png" width="125" height="125" />

    <div class="wrapper">
      <Profile v-bind:name=profileName v-bind:description=profileDescription />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About me</RouterLink>
        <RouterLink to="/exp">Experiences</RouterLink>
        <RouterLink to="/proj">Projects</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped>
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

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
