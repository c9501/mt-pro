<template>
  <div class="knowledge-list">
    <mt-knowledge-card v-for="i in 5" :key="i"></mt-knowledge-card>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
