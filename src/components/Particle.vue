<script lang="ts">
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default {
  data() {
    return {
      // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
      options: {
        fullScreen: {
          enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
          zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
        },
        interactivity: {
          events: {
            onClick: {
              enable: true, // enables the click event, it's disabled by default
              mode: "push", // adds the particles on click
            },
            onHover: {
              enable: true, // enables the mouse hover event, it's disabled by default
              mode: "repulse", // repulse the particles on mouse hover
            },
          },
          modes: {
            push: {
              quantity: 10, // number of particles to add on click
            },
            repulse: {
              distance: 300, // distance of the particles from the cursor
            },
          },
        },
        particles: {
          links: {
            distance: 200, // maximum distance for linking the particles
            enable: true, // enabling this will make the particles linked together
          },
          move: {
            enable: true, // enabling this will make particles move in the canvas
            speed: { min: 1, max: 5 }, // using a range in speed value will make particles move in a random speed between min/max values, each particle has its own value, it won't change over time by default
          },
          opacity: {
            value: { min: 0.3, max: 0.7 }, // using a different opacity, to have some semitransparent effects
          },
          size: {
            value: { min: 1, max: 3 }, // let's randomize the particles size a bit
          },
        },
      },
    };
  },
  methods: {
    async particlesInit(engine: Engine) {
      await loadSlim(engine);
    },
  },
};
</script>

<template>
  <Particles id="tsparticles" v-bind:options="options" v-bind:particlesInit="particlesInit"/>
</template>