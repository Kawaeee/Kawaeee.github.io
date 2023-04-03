<script setup lang="ts">
interface Contact {
  name: string,
  url: string,
  logo: string,
}

defineProps<{
  header: string,
  contacts: Contact[],
}>()
</script>

<template>
  <div class="about-block">
    <h3>{{ header }}</h3>
    <div class="contacts-list">
      <span v-for="(contact, index) in contacts" v-bind:key="index">
        <a target='_blank' v-bind:href="contact.url" v-bind:data-tooltip="contact.name"><img v-bind:src="contact.logo" v-bind:alt=contact.name width=50 height=50></a>
      </span>
    </div>
  </div>
</template>

<style scoped>
.about-block {
  font-size: 0.9em; /* Change the font size to a smaller value */
  line-height: 1.5; /* Add some line-height to increase readability */
  text-align: justify;
  margin: 1em 0; /* Add some margin to separate it from other content */
}

.contacts-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.contacts-list a {
  display: inline-block;
  place-items: center;
  place-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem;
  position: relative; /* Add relative positioning to the link */
}

.contacts-list a:hover::before {
  content: attr(data-tooltip); /* Show the value of the "data-tooltip" attribute */
  position: absolute;
  bottom: 100%; /* Position the tooltip above the link */
  left: 50%; /* Center the tooltip horizontally */
  transform: translateX(-50%); /* Center the tooltip vertically */
  background-color: black;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.8em;
  border-radius: 4px;
  white-space: nowrap; /* Prevent the tooltip from wrapping to a new line */
}

.contacts-list img {
  display: block;
  margin: 0 auto;
}

</style>