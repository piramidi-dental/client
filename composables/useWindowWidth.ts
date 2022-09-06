
import { RESPONSIVE } from '@/constants'

export default () => {
  const windowWidth = useState<number>('window-width', () => 0)

  const isResponsiveXs = computed(() => windowWidth.value >= RESPONSIVE.XS)
  const isResponsiveSm = computed(() => windowWidth.value >= RESPONSIVE.SM)
  const isResponsiveMd = computed(() => windowWidth.value >= RESPONSIVE.MD)

  const setWindowWidth = () => {
    windowWidth.value = <number>window.innerWidth
  }

  useEventListener('resize', setWindowWidth)

  onMounted(setWindowWidth)

  return {
    windowWidth,
    isResponsiveXs,
    isResponsiveSm,
    isResponsiveMd
  }
}
