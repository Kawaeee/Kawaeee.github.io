<script lang="ts">
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default {
  data() {
    return {
      options: {
        autoplay: true,
        delay: 0,
        fullScreen: { enable: true, zIndex: 1, },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        interactivity: {
          events: {
            detectsOn: "window",
            onClick: { enable: true, mode: "push", },
            onHover: { enable: true, mode: "bubble", parallax: { enable: false, force: 60, smooth: 10, }},
            // onHover: { enable: true, mode: "repulse", parallax: { enable: false, force: 2, smooth: 10, }},
            resize: { delay: 0.5, enable: true, }
          },
          modes: {
            attract: { distance: 200, duration: 0.4, easing: "ease-out-quad", factor: 1, maxSpeed: 50, speed: 1, },
            bounce: { distance: 200 },
            bubble: { distance: 400, duration: 2, mix: false, opacity: 0.8, size: 40, divs: { distance: 200, duration: 0.4, mix: false, selectors: [], }},
            connect: { distance: 80, links: { opacity: 0.5, }, radius: 60, },
            grab: { distance: 400, links: { blink: false, consent: false, opacity: 1, }},
            push: { default: true, groups: [], quantity: 2, },
            remove: { quantity: 1, },
            repulse: { distance: 200, duration: 0.4, factor: 100, speed: 1, maxSpeed: 50, easing: "ease-out-quad", divs: { distance: 200, duration: 0.4, factor: 100, speed: 1, maxSpeed: 50, easing: "ease-out-quad", selectors: [], }},
            slow: { factor: 3, radius: 200, },
            trail: { delay: 1, pauseOnStop: false, quantity: 1, },
            light: { area: { gradient: { start: { value: "#ffffff", }, stop: { value: "#000000", }}, radius: 1000, }, shadow: { color: { value: "#000000", }, length: 2000, }},
          },
        },
        particles: {
          bounce: { horizontal: { random: { enable: false, minimumValue: 0.1, }, value: 1, }, vertical: { random: { enable: false, minimumValue: 0.1, }, value: 1, }},
          collisions: { absorb: { speed: 2, }, bounce: { horizontal: { random: { enable: false, minimumValue: 0.1, }, value: 1, }, vertical: { random: { enable: false, minimumValue: 0.1, }, value: 1, }}, enable: false, mode: "bounce", overlap: { enable: true, retries: 0, }},
          color: { value: "#000000", animation: { h: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }, s: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }, l: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }} },
          move: { angle: { offset: 0, value: 90, }, attract: { distance: 200, enable: false, rotate: { x: 600, y: 1200, }}, center: { x: 50, y: 50, mode: "percent", radius: 0, }, decay: 0, distance: {}, direction: "none", drift: 0, enable: true, gravity: { acceleration: 9.81, enable: false, inverse: false, maxSpeed: 50, }, path: { clamp: true, delay: { random: { enable: false, minimumValue: 0, }, value: 0, }, enable: false, options: {}, }, outModes: { default: "out", bottom: "out", left: "out", right: "out", top: "out", }, random: false, size: false, speed: 2, spin: { acceleration: 0, enable: false, }, straight: false, trail: { enable: false, length: 10, fill: {}, }, vibrate: false, warp: false, }, number: { density: { enable: true, width: 1920, height: 1080, }, limit: 0, value: 10, }, opacity: { random: { enable: true, minimumValue: 0.1, }, value: { min: 0.1, max: 1, }, animation: { count: 0, enable: true, speed: 1, decay: 0, sync: false, destroy: "none", startValue: "random", minimumValue: 0.2, }}, reduceDuplicates: false, shadow: { blur: 0, color: { value: "#000" }, enable: false, offset: { x: 0, y: 0, }},
          shape: { options: { character: { fill: false, font: "Verdana", style: "", value: "*", weight: "400", }, char: { fill: false, font: "Verdana", style: "", value: "*", weight: "400", }, polygon: { sides: 5, }, star: { sides: 5, }, image: [ { src: "https://avatars.githubusercontent.com/u/77453675?s=200&v=4", width: 32, height: 32, }, ], images: [ { src: "https://avatars.githubusercontent.com/u/77453675?s=200&v=4", width: 32, height: 32, }, ] }, type: "image", },
          size: { random: { enable: false, minimumValue: 1, }, value: 16, animation: { count: 0, enable: false, speed: 40, decay: 0, sync: false, destroy: "none", startValue: "random", minimumValue: 0.1, }},
          stroke: { width: 0, color: { value: "#000000", animation: { h: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }, s: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }, l: { count: 0, enable: false, offset: 0, speed: 1, decay: 0, sync: true, }}}},
          zIndex: { random: { enable: false, minimumValue: 0, }, value: 0, opacityRate: 1, sizeRate: 1, velocityRate: 1, },
          life: { count: 0, delay: { random: { enable: false, minimumValue: 0, }, value: 0, sync: false, }, duration: { random: { enable: false, minimumValue: 0.0001, }, value: 0, sync: false, }},
          rotate: { random: { enable: true, minimumValue: 0, }, value: 0, animation: { enable: true, speed: 5, decay: 0, sync: false, }, direction: "random", path: false, },
          destroy: { bounds: {}, mode: "none", split: { count: 1, factor: { random: { enable: false, minimumValue: 0, }, value: 3, }, rate: { random: { enable: false, minimumValue: 0, }, value: { min: 4, max: 9, }}, sizeOffset: true, particles: {}, }},
          roll: { darken: { enable: false, value: 0, }, enable: false, enlighten: { enable: false, value: 0, }, mode: "vertical", speed: 25, },
          tilt: { random: { enable: false, minimumValue: 0, }, value: 0, animation: { enable: false, speed: 0, decay: 0, sync: false, }, direction: "clockwise", enable: false, },
          twinkle: { lines: { enable: false, frequency: 0.05, opacity: 1, }, particles: { enable: false, frequency: 0.05, opacity: 1, }},
          wobble: { distance: 5, enable: false, speed: { angle: 50, move: 10, }},
          orbit: { animation: { count: 0, enable: false, speed: 1, decay: 0, sync: false, }, enable: false, opacity: 1, rotation: { random: { enable: false, minimumValue: 0, }, value: 45, }, width: 1, },
          links: { blink: false, color: { value: "#000" }, consent: false, distance: 150, enable: false, frequency: 1, opacity: 0.4, shadow: { blur: 5, color: { value: "#000", }, enable: false, }, triangles: { enable: false, frequency: 1, }, width: 1, warp: false, },
          repulse: { random: { enable: false, minimumValue: 0, }, value: 0, enabled: false, distance: 1, duration: 1, factor: 1, speed: 1, },
        },
        absorbers: [ { color: { value: "#00BD7E" }, destroy: true, orbit: false, draggable: false, position: { x: 0, y: 0 }, size: { value: { min: 0, max: 1 }, density: 20, limit: { radius: 10000, mass: 0 }, random: { enable: false, minimumValue: 1 }},} ],
        // emitters: [ { direction: "top-right", position: { x: 0, y: 100 }, particles: { shape: { type: "circle" }, color: { value: "random" }, lineLinked: { enable: false, distance: 150, color: "#000", opacity: 0.4, width: 1 }, opacity: { value: 0.3 }, rotate: { value: 0, random: true, direction: "counter-clockwise", animation: { enable: true, speed: 15, sync: false }}}} ],
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        smooth: true,
        zLayers: 100,
      }
  };
  },
  methods: {
    async particlesInit(engine: Engine) {
      await loadFull(engine);
    },
  },
};
</script>

<template>
  <Particles
    id="tsparticles"
    v-bind:options="options"
    v-bind:particlesInit="particlesInit"
  />
</template>
