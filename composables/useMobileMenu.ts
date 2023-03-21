
import { Loading } from '@/types/enums'

interface IMobileMenu {
  isOpen: boolean,
  isDisable: boolean
}

export default () => {
  const { handleWaveActivation } = useWaveController()
  const { isResponsiveMd } = useMediaResponsive()
  const { waveController } = useWaveController()

  const mobileMenu = useState<IMobileMenu>('mobile-menu', () => ({
    isOpen: false,
    isDisable: false
  }))

  const toggleMenu = () : void => {
    mobileMenu.value.isOpen = !mobileMenu.value.isOpen
    mobileMenu.value.isDisable = true
    handleWaveActivation({ isActive: mobileMenu.value.isOpen, type: 'menu' })

    setTimeout(() => {
      mobileMenu.value.isDisable = false
    }, Loading.WaveDuration)
  }

  watch(isResponsiveMd, (val) => {
    if (val && waveController.value.isActive && waveController.value.type === 'menu') { toggleMenu() }
  })

  return {
    mobileMenu,
    toggleMenu
  }
}
