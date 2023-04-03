<script setup lang="ts">
import Experience from '../components/Experience.vue'

const experiences = {
  osotspa: {
    role: "Data Scientist",
    location: "Osotspa",
    duration: "July 2022 - Present",
    detail: [
      "💻🔍 Created Cleaning + PII hashing data pipeline automation on GCP",
      "🏷️🛠️ Setup an internal data labeling tool for machine learning project",
      "🔄💾 Migrated ~5.3 billion cap codes from the old system to Primo",
    ],
    logo: "src/assets/experiences/osotspa.png",
  },
  hedgehoglet: {
    role: "Software Engineer",
    location: "Hedgehoglet",
    duration: "July 2022 - Present",
    detail: [
      "🐱🍲 Worked on <a href='https://github.com/hedgehoglet/cat-food' target='_blank'>cat-food</a> python template",
      "🤔 To be added..."
    ],
    logo: "src/assets/experiences/hedgehoglet.png",
  },
  eatlab: {
    role: "Machine Learning Engineer",
    location: "EATLAB",
    duration: "September 2021 - June 2022",
    detail: [
      "📈👥 Implemented a data pipeline automation to run people detection, tracking, and count amount of people in and out of a specific area",
      "🌎🍔 Applied multilingual model to tackle food category classification task",
      "💰💻 Reduced cloud costs on AWS S3 and AWS Sagemaker",
    ],
    logo: "src/assets/experiences/eatlab.png",
  },
  omniscien: {
    role: "Machine Learning Engineer",
    location: "Omniscien Technologies",
    duration: "April 2020 – September 2021",
    detail: [
      "🤖🚀 Coded WARC Processor data processing pipeline from idea to production",
      "📖🗣️ Created various types of text translation tasks-related tools: NER, n-gram, etc",
      "⚙️💡 Setup back-translation module using AWS EC2 Spot instances",
      "🤝🌍 Supported ParaCrawl team on <a href='https://paracrawl.eu/manufactured-data' target='_blank'>ParaCrawl Synthesized Data (Release 2)</a>",
  ],
    logo: "src/assets/experiences/omniscien.png",
  },
  datawow: {
    role: "Data Science Intern",
    location: "Data Wow",
    duration: "June 2019 – July 2019",
    detail: [
      "📊🔍 Implemented and benchmarked Pantip tags text classifier with different approaches: Multinomial, LinearSVC, Bag of Words, fastText, and thai2fit",
      "🔎😀 Developed keyword-based emoji search web application called EmojiSearch",
    ],
    logo: "src/assets/experiences/datawow.png",
  },
  kmutt: {
    role: "Computer Science Student",
    location: "SIT, King Mongkut's University of Technology Thonburi",
    duration: "June 2016 - January 2020",
    detail: [
      "💇‍♂️💻📱 Implemented <a href='https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43' target='_blank'>iStylist: Hairstyle Recommender</a> mobile application",
      "✋✌️👊🧠 Worked on <a href='https://github.com/Kawaeee/RPS_classification' target='_blank'>Rock-Paper-Scissors hand gestures classification</a> using Keras",
      "☕️💻💰 Built <a href='https://github.com/Kawaeee/Starbucks' target='_blank'>fake Starbucks website</a> using PHP and MySQL database",
    ],
    logo: "src/assets/experiences/kmutt.png",
  }
}
</script>

<template>
<div class="experiences">
  <Experience v-for="(experience, key) in experiences" 
              v-bind:key="key"
              v-bind:role="experience.role"
              v-bind:location="experience.location"
              v-bind:duration="experience.duration"
              v-bind:detail="experience.detail"
              v-bind:logo="experience.logo" />
</div>
</template>

<style>

.experiences {
  padding-top: 20px;
}

</style>
