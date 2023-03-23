
/*
  Objects
 */

declare interface IStringItem {
  [key: string]: string
}

declare interface IStringNumberItem {
  [key: string]: string | number
}

declare interface IBooleanItem {
  [key: string]: boolean
}

declare interface IStringNumberNullItem {
  [key: string]: string | number | null
}

declare interface IStringDeep {
  [key: string]: { [key: string]: string }
}

/*
  Error
 */

declare interface IRequestError extends Error {
  error: {
    status: number,
    message: string,
    name: string
  }
}

/*
 Components
 */

declare type componentType = 'list' | 'accordeon' | 'table'
