<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="container">
      <n-page-header subtitle="back" @back="handleBack">
        <slot />
      </n-page-header>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleBack = () => {
  navigateTo('/')
}
</script>
