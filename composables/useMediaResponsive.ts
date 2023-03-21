
import { Responsive } from '@/types/enums'

export default () => {
  const windowWidth = useState<number>('window-width')

  const isResponsiveXs = computed(() => windowWidth.value >= Responsive.Xs)
  const isResponsiveSm = computed(() => windowWidth.value >= Responsive.Sm)
  const isResponsiveMd = computed(() => windowWidth.value >= Responsive.Md)

  return {
    isResponsiveXs,
    isResponsiveSm,
    isResponsiveMd
  }
}
