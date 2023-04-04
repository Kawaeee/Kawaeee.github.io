<script setup lang="ts">
import Project from "../components/Project.vue"

import blankIcon from "../assets/projects/blank.png"
import bobIcon from "../assets/projects/butt_or_bread.png"
import githubIcon from "../assets/projects/github.png"
import istylistIcon from "../assets/projects/istylist.png"
import scalaIcon from "../assets/projects/scala.png"

const projects = [
  { name: "Corgi butt or a loaf of bread?", description: "🍞🐶 A classifier that can classify between corgi butt and loaf of bread using PyTorch", application_url: "https://share.streamlit.io/kawaeee/butt_or_bread/", logo: bobIcon, source_url: "https://github.com/Kawaeee/butt_or_bread" },
  { name: "Scala DS", description: "📊💻🔢 Scala programming language for data science!", application_url: "https://kawaeee.github.io/scala_ds/", logo: scalaIcon, source_url: "https://github.com/Kawaeee/scala_ds" },
  { name: "iStylist: Hairstyle Recommender", description: "💇‍♂️💻📱 The mobile application that helps the user to choose a hairstyle based on the user's face shape", application_url: "https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43", logo: istylistIcon, source_url: "" },
  { name: "py-hLEPOR", description: "🐍📊 Python Bindings to hLEPOR metric", application_url: "", logo: blankIcon, source_url: "https://github.com/Kawaeee/py-hLEPOR" },
  { name: "pHash", description: "🔍🖼️ Image de-duplication using Perceptual Hashing(pHash)", application_url: "", logo: blankIcon, source_url: "https://github.com/Kawaeee/phash" },
  { name: "For other projects", description: "📁🔍 Feel free to check out my GitHub!", application_url: "", logo: githubIcon, source_url: "https://github.com/Kawaeee/" },
]

</script>

<template>
  <div class="projects">
    <div class="grid">
      <Project v-for="(project, index) in projects" :key="index" :name="project.name" :description="project.description" :application_url="project.application_url" :logo="project.logo" :source_url="project.source_url" />
    </div>
  </div>
</template>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>