
import { RESPONSIVE } from '@/constants'

export default () => {
  const windowWidth = useState<number>('window-width', () => 0)

  useEventListener('resize', () : void => {
    windowWidth.value = <number>window.innerWidth
  })

  const isResponsiveXs = computed(() => windowWidth.value >= RESPONSIVE.XS)
  const isResponsiveSm = computed(() => windowWidth.value >= RESPONSIVE.SM)
  const isResponsiveMd = computed(() => windowWidth.value >= RESPONSIVE.MD)

  return {
    windowWidth,
    isResponsiveXs,
    isResponsiveSm,
    isResponsiveMd
  }
}
