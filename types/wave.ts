
type IWavetypes = 'loading' | 'menu'

interface IWaveController {
  isActive: boolean,
  type?: IWavetypes,
  loadingText?: string
}

export {
  IWavetypes,
  IWaveController
}
