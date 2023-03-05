
import { RESPONSIVE } from '@/constants'

export default () => {
  const windowWidth = useState<number>('window-width', () => 0)
  const isMobilePortrait = useState<boolean>('mobile-portrait', () => false)

  const setWindowWidth = () => {
    windowWidth.value = <number>(window.innerWidth > 0 ? window.innerWidth : screen.width)

    const vh = <number>(window.innerHeight > 0 ? window.innerHeight : screen.height) * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const checkMobilePortrait = () => {
    if (screen.availHeight < RESPONSIVE.SM && (screen.orientation.type.match(/\w+/)?.includes('landscape') as boolean)) {
      isMobilePortrait.value = true
      showError('')
    } else if (isMobilePortrait.value) {
      isMobilePortrait.value = false
      clearError()
    }
  }

  useEventListener('resize', setWindowWidth)

  watch(windowWidth, checkMobilePortrait)

  onMounted(setWindowWidth)
  onMounted(checkMobilePortrait)

  return {
    windowWidth
  }
}
