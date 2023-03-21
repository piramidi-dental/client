
interface ITreatments {
  id: number,
  attributes: {
    name: string,
    description?: string | null
  }
}

interface ITreatmentAttr {
  title: string,
  description?: string | null,
  componentType: componentType,
  treatments: {
    data: ITreatments[]
  }
}

interface ITreatmentList {
  data: {
    id: number,
    attributes: ITreatmentAttr
  }
}

export {
  ITreatmentList,
  ITreatmentAttr,
  ITreatments
}
