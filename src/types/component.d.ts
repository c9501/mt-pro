import mtNavBar from '@/components/mt-nav-bar.vue'
import mtIcons from '@/components/mt-icons.vue'

declare module 'vue' {
  interface GlobalComponents {
    mtNavBar: typeof mtNavBar
    mtIcons: typeof mtIcons
  }
}
