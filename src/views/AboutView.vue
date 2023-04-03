<script setup lang="ts">
import About from '../components/About.vue'

const header = "Hi, I'm Kaw, a software engineer with experience in data science and machine learning. I have worked for various companies such as Osotspa, EATLAB, and Omniscien Technologies, and also completed an internship at Data Wow. Throughout my career, I have gained expertise in developing data pipeline automation, machine translation, text classification, people detection, and cost optimization in cloud services. I have also created several tools for text translation tasks, internal data labeling, and even a keyword-based emoji search application. [ChatGPT said]"

const contacts = [
  {name: "Email", url: "mailto:kawaekc@gmail.com", logo: "/src/assets/about/email.png"},
  {name: "GitHub", url: "https://github.com/Kawaeee", logo: "/src/assets/about/github.png"},
  {name: "Linkedin", url: "https://www.linkedin.com/in/kasidech-kaw/", logo: "src/assets/about/linkedin.png"},
  {name: "Medium", url: "https://kawaekc.medium.com/", logo: "/src/assets/about/medium.png"},
]
</script>

<template>
  <div class="about">
    <About v-bind:header=header v-bind:contacts=contacts></About>
  </div>
</template>

<style lang="scss">

.about {
  padding-top: 20px;
}

</style>