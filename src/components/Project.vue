<script setup lang="ts">
defineProps<{
  name: string,
  description: string,
  application_url: string,
  source_url: string,
  logo: string
}>()
</script>

<template>
    <div class="project-block">
      <div class="logo">
        <img v-bind:src=logo v-bind:alt=name width="75" height="75"/>
      </div>
      
      <div class="description">
        <h3>{{ name }}</h3>
        <h4>{{ description }}</h4>
        <h5 v-if="application_url">
          <a target='_blank' v-bind:href=application_url>🚀 View Application</a>
        </h5>
        <h5 v-if="source_url">
          <a target='_blank' v-bind:href=source_url v-bind:title="source_url.startsWith('https://github') ? 'View Source on GitHub' : ''">
            {{ source_url.startsWith('https://github') ? '🔗' : '' }} View Source
          </a>
        </h5>
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

.project-block {
  display: flex;
  align-items: center;
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