
type IClinicPhone = 'phone' | 'mobile'

type IClinic = {
  id: number,
  attributes: {
    address: string,
    map: string,
    mobile: string,
    name: string,
    phone: string
  }
}

type IContactAttr = {
  clinics: {
    data: IClinic[]
  },
  email: string,
  openingHours: string
}

type IContact = {
  data: {
    id: number,
    attributes: IContactAttr
  }
}

export {
  IClinicPhone,
  IClinic,
  IContactAttr,
  IContact
}
