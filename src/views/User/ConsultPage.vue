<template>
  <div class="consult-page">
    <mt-nav-bar title="问诊记录" />
    <van-tabs sticky>
      <van-tab title="极速问诊"><ConsultList :type="ConsultType.Fast" /></van-tab>
      <van-tab title="找医⽣"><ConsultList :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="开药问诊"><ConsultList :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import ConsultList from "./Components/ConsultList.vue"
import { ConsultType } from '@/enums'
</script>
<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--mt-bg);
  min-height: calc(100vh - 46px);
}
</style>
