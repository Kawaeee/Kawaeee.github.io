<script setup lang="ts">
// Parameters needed (urls)
defineProps<{
  email: string,
  urls: {
    github: string,
    linkedin: string,
    medium: string,
  },
}>()
</script>

<template>
  <div class="about-component">
    <li><a v-bind:href=email>Email</a></li>
    <li><a v-bind:href=urls.github>GitHub</a></li>
    <li><a v-bind:href=urls.linkedin>Linkedin</a></li>
    <li><a v-bind:href=urls.medium>Medium</a></li>
  </div>
</template>