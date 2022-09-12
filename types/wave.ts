
type IWaveTypes = 'loading' | 'menu'

type IWaveController = {
  isActive: boolean,
  type?: IWaveTypes,
  loadingText?: string
}

export {
  IWaveTypes,
  IWaveController
}
