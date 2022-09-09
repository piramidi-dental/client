
import type { IWaveTypes, IWaveController } from '@/types/wave'

export default () => {
  const waveController = useState('wave-controller', () => ({
    isActive: false,
    type: 'loading',
    loadingText: ''
  }))

  const setLoadingText = (text: string) => {
    waveController.value.loadingText = text
  }

  const setWaveType = (type: IWaveTypes) => {
    waveController.value.type = type
  }

  const handleWaveActivation = (data: IWaveController) => {
    const { isActive, type = 'loading', loadingText = waveController.value.loadingText } = data

    waveController.value = {
      ...waveController.value,
      isActive,
      type,
      loadingText
    }
  }

  return {
    waveController,
    setLoadingText,
    setWaveType,
    handleWaveActivation
  }
}
