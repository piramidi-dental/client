
type Treatments = {
  id: number,
  attributes: {
    name: string,
    description?: string | null
  }
}

type TreatmentAttr = {
  title: string,
  description?: string | null,
  componentType: componentType,
  treatments: {
    data: Treatments[]
  }
}

type TreatmentList = {
  data: {
    id: number,
    attributes: TreatmentAttr
  }
}

export {
  TreatmentList,
  TreatmentAttr,
  Treatments
}
