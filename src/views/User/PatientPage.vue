<template>
  <div class="patient-page">
    <mt-nav-bar title="家庭档案"></mt-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in list" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/,'\$1******\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}</span>
        </div>
        <div class="icon"><mt-icons name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag===1">默认</div>
      </div>

      <div class="patient-add">
        <mt-icons name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip" v-if="list.length<6">最多可添加 6 ⼈</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPatientList } from '@/services/user'
import type { PatientList } from '@/types/user'
import { onMounted, ref } from 'vue'
// 1. ⻚⾯初始化加载数据
const list = ref<PatientList>([])
const loadList = async () => {
  const res = await getPatientList()
  list.value = res.data
}
onMounted(() => {
  loadList()
})
</script>
<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}

.patient-list {
  padding: 15px;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--mt-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--mt-bg);
  transition: all 0.3s;
  overflow: hidden;

  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    span {
      color: var(--mt-tip);
      margin-right: 20px;
      line-height: 30px;

      &.name {
        font-size: 16px;
        color: var(--mt-text1);
        width: 80px;
        margin-right: 0;
      }

      &.id {
        color: var(--mt-text2);
        width: 180px;
      }
    }
  }

  .icon {
    color: var(--mt-tag);
    width: 20px;
    text-align: center;
  }

  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--mt-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.selected {
    border-color: var(--mt-primary);
    background-color: var(--mt-plain);

    .icon {
      color: var(--mt-primary);
    }
  }
}

.patient-add {
  background-color: var(--mt-bg);
  color: var(--mt-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;

  .mt-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: var(--mt-tag);
  padding: 12px 0;
}
</style>
