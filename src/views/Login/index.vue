<template>
  <div class="login-page">
    <!-- navbar -->
    <mt-nav-bar
      right-text="注册"
      title="登录"
      @click-right="$router.push('/register')"
    ></mt-nav-bar>

    <!-- 头部信息 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form表单 -->
    <van-form autocomplete="off" @submit="loginHandle">
      <van-field
        :rules="mobileRules"
        v-model="loginForm.mobile"
        placeholder="请输入手机号码"
        type="tel"
      />
      <van-field
        :rules="passwordRules"
        v-model="loginForm.password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <!-- <img src="../../icons/login/eye-off.svg" alt=""> -->
          <mt-icons
            :name="show ? 'login-eye-on' : 'login-eye-off'"
            @click="show = !show"
          ></mt-icons>
        </template>
      </van-field>
      <div class="mt-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="mt-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="mt-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { showToast } from 'vant'
// 手机号// 密码
import type { loginRules } from '@/services/types/user.d'
import { loginByPassword } from '@/services/user'
const loginForm = ref<loginRules>({
  mobile: '13230000001',
  password: 'abc12345'
})

// 协议状态
const agree = ref<boolean>(false)
// 密码状态
const show = ref<boolean>(false)
// 登录方法
const loginHandle = () => {
  if (!agree.value) {
    showToast('请勾选用户协议')
    return
  }
  loginByPassword(loginForm.value).then((res) => {
    console.log(res)
  })
}
</script>
<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 15px;

  .mt-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .van-checkbox {
    a {
      color: var(--mt-primary);
      padding: 0 5px;
    }
  }
}
</style>
