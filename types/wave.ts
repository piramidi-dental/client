
type WaveTypes = 'loading' | 'menu'

type WaveController = {
  isActive: boolean,
  type?: WaveTypes,
  loadingText?: string
}

export {
  WaveTypes,
  WaveController
}
