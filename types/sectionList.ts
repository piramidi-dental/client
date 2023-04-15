
type Lists = 'treatments' | 'therapies'

type ListItem = {
  id: number,
  attributes: {
    name: string,
    description?: string | null,
    uuid: string
  }
}

type ListAttributes = {
  title: string,
  description?: string | null,
  componentType: componentType,
  treatments: { data: ListItem[] },
  therapies: { data: ListItem[] }
}

type List = {
  data: {
    id: number,
    attributes: ListAttributes
  }
}

export {
  Lists,
  ListItem,
  ListAttributes,
  List
}
