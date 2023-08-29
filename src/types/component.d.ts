// 组件ts类型
import mtNavBar from '@/components/mt-nav-bar.vue'
import mtIcons from '@/components/mt-icons.vue'
import mtRadioBtn from '@/components/mt-radio-btn.vue'
declare module 'vue' {
  interface GlobalComponents {
    mtNavBar: typeof mtNavBar
    mtIcons: typeof mtIcons
    mtRadioBtn : typeof mtRadioBtn
  }
}
