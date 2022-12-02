<template>
  <div class="part-weather">
    <div class="left">
      <Svg :iconClass="" size="32px"></Svg>
      <p class="time">今天</p>
      ·
      <p class="text-day">晴</p>
    </div>
    <div class="right">
      <p>high</p>
      /
      <p>low</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
.part-weather
    width: 80%
    height: 1rem
</style>