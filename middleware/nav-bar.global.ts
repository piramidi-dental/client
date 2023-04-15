
import { Loading } from '@/types/enums'

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    process.client &&
    from.meta.title === 'home' &&
    to.meta.title !== 'home'
  ) {
    const logoBox: HTMLElement | null = document.querySelector('.nav-bar__logo-box')
    if (logoBox) {
      setTimeout(() => {
        logoBox.style.opacity = '1'
      }, Loading.WaveDuration)
    }
  }
})
