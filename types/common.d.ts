
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

/*
  API
*/

declare interface IApiBase {
  id: number,
  attributes: {
    createdAt: string,
    publishedAt: string,
    updatedAt: string
  }
}

declare interface IApiObject {
  data: IApiBase
}

declare interface IApiList {
  data: IApiBase[]
}
