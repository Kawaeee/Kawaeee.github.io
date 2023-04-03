<script setup lang="ts">
import Experience from '../components/Experience.vue'

const experiences = {
  osotspa: {
    role: "Data Scientist",
    location: "Osotspa",
    duration: "July 2022 - Present",
    detail: "---",
    logo: "src/assets/experiences/osotspa.png",
  },
  hedgehoglet: {
    role: "Software Engineer",
    location: "Hedgehoglet",
    duration: "July 2022 - Present",
    detail: "---",
    logo: "src/assets/experiences/hedgehoglet.png",
  },
  eatlab: {
    role: "Machine Learning Engineer",
    location: "EATLAB",
    duration: "September 2021 - June 2022",
    detail: "---",
    logo: "src/assets/experiences/eatlab.png",
  },
  omniscien: {
    role: "Machine Learning Engineer",
    location: "Omniscien Technologies",
    duration: "April 2020 – September 2021",
    detail: "---",
    logo: "src/assets/experiences/omniscien.png",
  },
  datawow: {
    role: "Data Science Intern",
    location: "Data Wow",
    duration: "June 2019 – July 2019",
    detail: "---",
    logo: "src/assets/experiences/datawow.png",
  },
  kmutt: {
    role: "Computer Science Student",
    location: "School of Information Technology, King Mongkut's University of Technology Thonburi",
    duration: "2016 - 2020",
    detail: "---",
    logo: "src/assets/experiences/kmutt.png",
  }
}
</script>

<template>
  <div class="experience">
    <Experience v-bind:role=experiences.osotspa.role v-bind:location=experiences.osotspa.location v-bind:duration=experiences.osotspa.duration v-bind:detail=experiences.osotspa.detail v-bind:logo=experiences.osotspa.logo></Experience>
    <Experience v-bind:role=experiences.hedgehoglet.role v-bind:location=experiences.hedgehoglet.location v-bind:duration=experiences.hedgehoglet.duration v-bind:detail=experiences.hedgehoglet.detail v-bind:logo=experiences.hedgehoglet.logo></Experience>
    <Experience v-bind:role=experiences.eatlab.role v-bind:location=experiences.eatlab.location v-bind:duration=experiences.eatlab.duration v-bind:detail=experiences.eatlab.detail v-bind:logo=experiences.eatlab.logo></Experience>
    <Experience v-bind:role=experiences.omniscien.role v-bind:location=experiences.omniscien.location v-bind:duration=experiences.omniscien.duration v-bind:detail=experiences.omniscien.detail v-bind:logo=experiences.omniscien.logo></Experience>
    <Experience v-bind:role=experiences.datawow.role v-bind:location=experiences.datawow.location v-bind:duration=experiences.datawow.duration v-bind:detail=experiences.datawow.detail v-bind:logo=experiences.datawow.logo></Experience>
    <Experience v-bind:role=experiences.kmutt.role v-bind:location=experiences.kmutt.location v-bind:duration=experiences.kmutt.duration v-bind:detail=experiences.kmutt.detail v-bind:logo=experiences.kmutt.logo></Experience>
  </div>
</template>