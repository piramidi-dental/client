
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

declare interface IStringDeep {
  [key: string]: { [key: string]: string }
}

/*
  Error
 */

declare interface IRequestError extends Error {
  data: {
    error: {
      status: number,
      message: string,
      name: string
    }
  }
}
