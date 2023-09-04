<template>
  <div class="patient-page">
    <mt-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></mt-nav-bar>
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医⽣给出更准确的治疗，信息仅医⽣可⻅</p>
    </div>
    <div class="patient-page-list">
      <div class="patient-item" v-for="(item, index) in list" :key="index" @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <!-- 身份证脱敏处理   /^(.{6})(?:\d+)(.{4})$/ -->
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)"><mt-icons name="user-edit"></mt-icons></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" @click="showPopup()" v-if="list.length <= 6">
        <mt-icons name="user-add"></mt-icons>
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加6人</div>
    </div>
    <!-- 右侧弹出 -->
    <van-popup v-model:show="show" position="right">
      <!-- 通过用户ID来判断是编辑还是添加 -->
      <mt-nav-bar :back="backPopup" :title="patient.id ? '编辑患者' : '添加患者'" rightText="保存"
        @click-right="submit"></mt-nav-bar>

      <van-form autocomplete="off">
        <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名"></van-field>
        <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" />
        <van-field label="性别">
          <!-- 作用域插槽显示当前用户信息 -->
          <template #input>
            <mt-radio-btn :options="options" v-model="patient.gender"></mt-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>

      <van-action-bar>
        <van-action-bar-button @click="remove" v-if="patient.id">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
    <!-- 底部按钮 -->
    <div class="patient-next" v-if="isChange">
      <van-button type="primary" @click="next" round block>下⼀步</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">

// region Main
// {
//   // import { getPatientList } from '@/services/user'
// // import type { PatientList } from '@/types/user'
// // import { onMounted, ref } from 'vue'
// // // 1. ⻚⾯初始化加载数据
// // const list = ref<PatientList>([])
// // const loadList = async () => {
// //   const res = await getPatientList()
// //   list.value = res.data
// // }
// // onMounted(() => {
// //   loadList()
// // })
// }
// endregion


import { useRoute,useRouter} from 'vue-router'
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient'
import type { PatientList, Patient } from '@/types/user'
import { userConsultStore } from '@/stores/consult'
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import Validator from 'id-validator'   //身份证要验证引入
import { showConfirmDialog } from 'vant'
const route = useRoute()
const router = useRouter()
const store = userConsultStore()
const isChange = computed(() => route.query.isChange === '1')
// 创建一个变量,保存患者列表
const list = ref<PatientList>([])

// 初始化患者列表数据
const initPatientList = async () => {
  const patienRes = await getPatientList()
  list.value = patienRes.data
  // 设置默认选中的ID，当你是选择患者的时候，且有患者信息的时候
  if (isChange.value && list.value.length) {
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    if (defPatient) patientId.value = defPatient.id
    else patientId.value = list.value[0].id
  }
}
initPatientList()

// 性别数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 弹框显示与隐藏
const show = ref(false)

// 打开弹框
const showPopup = (item?: Patient) => {
  //先判断添加还是编辑，给表单数据回显
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else { //表单数据清空初始化
    patient.value = { ...initPatient }
  }
  //弹框显示
  show.value = true
}

// 关闭弹框
const backPopup = () => {
  show.value = false
}

// 保存 添加和编辑
const submit = async () => {
  //用户名判空
  if (!patient.value.name) return showToast('请输入真实姓名')
  //身份证号判空
  if (!patient.value.idCard) return showToast('请输入身份证号')
  //身份证验证   实例化
  const validator = new Validator()
  if (!validator.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  //解构性别属性进行判断
  const { sex } = validator.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
  // 保存/编辑患者
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  //关闭弹框
  show.value = false
  //刷新页面
  initPatientList()
  //消息提示
  showToast(patient.value.id ? '编辑成功' : '添加成功')
}
//初始化表单数据，用来关闭弹框后清空表单数据
const initPatient: Patient = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}

// 表单响应数据
const patient = ref<Patient>({ ...initPatient })
//计算属性监听默认患者的值
const defaultFlag = computed({
  get() {  //获取计算属性的值
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {  //给数据重新赋值
    patient.value.defaultFlag = value ? 1 : 0
  }
})

// 删除患者
const remove = async () => {
  if (patient.value.id) {
    //dialog弹框提示
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 `  //获取当前患者姓名
    })
    //调用删除api
    await delPatient(patient.value.id)
    //关闭弹框
    show.value = false
    //刷新页面
    initPatientList()
    //提示消息
    showToast('删除成功')
  }
}
const patientId = ref<string>()
const selectedPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}

const next = async () => {
if (!patientId.value) return showToast('请选就诊择患者')
store.setPatient(patientId.value)
router.push('/consult/pay')
}
</script>
<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;

  &-list {
    padding: 15px;

    .patient-item {
      background-color: var(--mt-bg);
      padding: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;
      &.selected {
        border-color: var(--mt-primary);
        background-color: var(--mt-plain);
      }
      .info {
        display: flex;
        flex: 1;
        flex-wrap: wrap;

        span {
          margin-right: 20px;
          line-height: 30px;
          color: var(--mt-tip);

          &.name {
            width: 60px;
            font-size: 16px;
            color: var(--mt-text1);
            // margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &.id {
            width: 180px;
            color: var(--mt-text1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
        color: white;
        font-size: 10px;
        width: 30px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: var(--mt-primary);
        right: 60px;
        top: 21px;
      }
    }

    .patient-add {
      background-color: var(--mt-bg);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      color: var(--mt-primary);

      .mt-icon {
        font-size: 24px;
      }
    }

    .patient-tip {
      color: var(--mt-tag);
      padding: 12px 0;
    }
  }

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;

      .van-form {
        padding-top: 46px;
      }

      // 底部操作栏
      .van-action-bar {
        padding: 0 10px;
        margin-bottom: 10px;

        .van-button {
          color: var(--mt-price);
          background-color: var(--mt-bg);
        }
      }
    }
  }
}

.patient-change {
  padding: 15px;

  >h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }

  >p {
    color: var(--mt-text3);
  }
}

.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
