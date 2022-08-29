
import { LOADING } from '@/constants'

export default () => {
  const waveTemplate = useState<boolean>('wave-template')
  const waveController = useState<IWaveController>('wave-controller', () => ({
    isActive: false,
    isLoading: true,
    loadingText: ''
  }))

  const setLoadingText = (text: string) => {
    waveController.value.loadingText = text
  }

  const handleWaveActivation = (data: { value: boolean, isLoading?: boolean }) => {
    const { value, isLoading = true } = data

    waveController.value = {
      ...waveController.value,
      isActive: value,
      isLoading
    }
  }

  watch(waveTemplate, (val) => {
    if (!val && !waveController.value.isLoading) {
      waveController.value.isLoading = true
    }
  })

  return {
    waveController,
    setLoadingText,
    handleWaveActivation
  }
}
