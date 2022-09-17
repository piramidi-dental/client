
import { RESPONSIVE } from '@/constants'

export default () => {
  const windowWidth = useState<number>('window-width')

  const isResponsiveXs = computed(() => windowWidth.value >= RESPONSIVE.XS)
  const isResponsiveSm = computed(() => windowWidth.value >= RESPONSIVE.SM)
  const isResponsiveMd = computed(() => windowWidth.value >= RESPONSIVE.MD)

  return {
    isResponsiveXs,
    isResponsiveSm,
    isResponsiveMd
  }
}
