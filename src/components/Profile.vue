<script setup lang="ts">
defineProps<{
  name: string,
  description: string,
}>()
</script>

<template>
  <div class="profile-component">
    <h1 class="green">{{ name }}</h1>
    <h3>{{ description }}</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.profile-component h1,
.profile-component h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .profile-component h1,
  .profile-component h3 {
    text-align: left;
  }
}
</style>
