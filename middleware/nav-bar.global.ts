
import { LOADING } from '@/constants'

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    process.client &&
    from.meta.title === 'Home' &&
    to.meta.title !== 'Home'
  ) {
    const logoBox: HTMLElement | null = document.querySelector('.nav-bar__logo-box')
    if (logoBox) {
      setTimeout(() => {
        logoBox.style.opacity = '1'
      }, LOADING.WAVE_DURATION)
    }
  }
})
