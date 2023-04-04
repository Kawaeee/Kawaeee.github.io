<script setup lang="ts">
defineProps<{
  role: string,
  location: string,
  duration: string,
  detail: string[],
  logo: string
}>()
</script>

<template>
    <div class="experience-block">
      <div class="logo">
        <img v-bind:src="logo" v-bind:alt="location" width="75" height="75"/>
      </div>
      
      <div class="description">
        <h3>{{ role }} at {{ location }}</h3>
        <h4>{{ duration }}</h4>
        <h5 v-for="(item, index) in detail" v-bind:key="index" v-html="item"></h5>
      </div>
    </div>
</template>

<style scoped>

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--color-heading);
}

h4 {
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

h5 {
  font-size: 0.75rem;
  font-weight: 300;
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

.experience-block {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.logo {
  display: flex;
  margin-right: 15px;
  place-items: center;
  place-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100px;
  height: 100px;
  color: var(--color-text);
}

.description {
  flex: 1;
}

</style>