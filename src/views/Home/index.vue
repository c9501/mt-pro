<template>
  <div class="home-page">
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <mt-icons name="home-search" />搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <mt-icons name="home-doctor"></mt-icons>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" class="nav">
            <mt-icons name="home-graphic"></mt-icons>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生激素回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <mt-icons name="home-prescribe"></mt-icons>
            <p class="title"> 开药门诊 </p>
            <p class="desc">线上买药方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <mt-icons name="home-order"></mt-icons>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>

        <van-col span="6">
          <router-link to="/" class="nav min">
            <mt-icons name="home-docs"></mt-icons>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <mt-icons name="home-rp"></mt-icons>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <mt-icons name="home-find"></mt-icons>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like"><mt-knowledge-list /></van-tab>
      <van-tab title="推荐" name="recommend"><mt-knowledge-list /></van-tab>
      <van-tab title="减脂" name="fatReduction"><mt-knowledge-list /></van-tab>
      <van-tab title="饮食" name="food"><mt-knowledge-list /></van-tab>
    </van-tabs>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult'
const active = ref<KnowledgeType>('recommend')
</script>
<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}

.home-header {
  height: 100px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, .85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  .con {
    position: relative;
    padding: 0 15px;

    >h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }

    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, .8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--mt-dark);
      font-size: 13px;

      .mt-icon {
        font-style: 16px;
        margin-right: 5px;
      }
    }
  }
}

.home-navs {
  padding: 10px 15px 0 15px;

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;

    .mt-icon {
      font-size: 48px;
    }

    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--mt-text1);
    }

    .desc {
      font-size: 11px;
      color: var(--mt-tag);
      margin-top: 2px;
    }

    &.min {
      .mt-icon {
        font-size: 31px;
      }

      .title {
        font-size: 13px;
        color: var(--mt-text2);
        font-weight: normal;
      }
    }
  }
}

.home-banner {
  padding: 10px 15px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
  }
}


</style>
