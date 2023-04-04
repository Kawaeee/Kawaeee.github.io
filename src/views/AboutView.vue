<script setup lang="ts">
import About from "../components/About.vue"

import emailIcon from "../assets/about/email.png"
import githubIcon from "../assets/about/github.png"
import linkedinIcon from "../assets/about/linkedin.png"
import mediumIcon from "../assets/about/medium.png"

const header = "Hi, I'm Kaw, a software engineer with experience in data science and machine learning. I have worked for various companies such as Osotspa, EATLAB, and Omniscien Technologies, and also completed an internship at Data Wow. Throughout my career, I have gained expertise in developing data pipeline automation, machine translation, text classification, people detection, and cost optimization in cloud services. I have also created several tools for text translation tasks, internal data labeling, and even a keyword-based emoji search application. [ChatGPT said]"

const contacts = [
  {name: "Email", url: "mailto:kawaekc@gmail.com", logo: emailIcon},
  {name: "GitHub", url: "https://github.com/Kawaeee", logo: githubIcon},
  {name: "Linkedin", url: "https://www.linkedin.com/in/kasidech-kaw/", logo: linkedinIcon},
  {name: "Medium", url: "https://kawaekc.medium.com/", logo: mediumIcon},
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