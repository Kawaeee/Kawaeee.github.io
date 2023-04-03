<script setup lang="ts">
defineProps<{
  role: string,
  location: string,
  duration: string,
  detail: string,
  logo: string
}>()
</script>

<template>
    <div class="item">
      <i>
        <slot name="icon"></slot>
        <img v-bind:src=logo width="75" height="75"/>
      </i>
      <div class="details">
        <h3>
          <slot name="heading"></slot>
          {{ role }} at {{ location }}
        </h3>
        <slot></slot>
        {{ duration }} || {{ detail }}
      </div>
    </div>
</template>

<style scoped>
  .item {
    margin-top: 2rem;
    display: flex;
  }
  
  .details {
    flex: 1;
    margin-left: 1rem;
  }
  
  i {
    display: flex;
    place-items: center;
    place-content: center;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: 100px;
    height: 100px;
    color: var(--color-text);
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
  }
  
  @media (min-width: 1024px) {
    .item {
      margin-top: 10;
      padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    }
  
    i {
      top: calc(50% - 25px);
      left: -25px;
      position: absolute;
      border: 1px solid var(--color-border);
      background: var(--color-background);
      border-radius: 8px;
      width: 100px;
      height: 100px;
    }
  
    .item:before {
      content: ' ';
      border-left: 1px solid var(--color-border);
      position: absolute;
      left: 25px;
      bottom: calc(50% + 25px);
      height: calc(50% - 30px);
    }

    .item:first-of-type:before {
      display: none;
    }
  }
</style>

