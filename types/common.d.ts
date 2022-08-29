
/*
  Objects
 */

declare interface IStringItem {
  [key: string]: string
}

declare interface IStringNumberItem {
  [key: string]: string | number
}

declare interface IWaveController {
  isActive: boolean,
  isLoading: boolean,
  loadingText: string
}
