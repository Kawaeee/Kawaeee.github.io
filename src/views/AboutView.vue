<script setup lang="ts">
import About from "../components/About.vue"

import EmailIcon from "../assets/about/email.png"
import GithubIcon from "../assets/about/github.png"
import LinkedinIcon from "../assets/about/linkedin.png"
import MediumIcon from "../assets/about/medium.png"

const header = "Hi, I'm Kaw, a software engineer with experience in data science and machine learning. I have worked for various companies such as Osotspa, EATLAB, and Omniscien Technologies, and also completed an internship at Data Wow. Throughout my career, I have gained expertise in developing data pipeline automation, machine translation, text classification, people detection, and cost optimization in cloud services. I have also created several tools for text translation tasks, internal data labeling, and even a keyword-based emoji search application. [ChatGPT said]"

const contacts = [
  {name: "Email", url: "mailto:kawaekc@gmail.com", icon: EmailIcon},
  {name: "GitHub", url: "https://github.com/Kawaeee", icon: GithubIcon},
  {name: "Linkedin", url: "https://www.linkedin.com/in/kasidech-kaw/", icon: LinkedinIcon},
  {name: "Medium", url: "https://kawaekc.medium.com/", icon: MediumIcon},
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