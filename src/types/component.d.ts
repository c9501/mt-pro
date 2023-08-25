import mtNavBar from '@/components/mt-nav-bar.vue'
declare module 'vue' {
  interface GlobalComponents {
    mtNavBar: typeof mtNavBar
  }
}
