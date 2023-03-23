
type ClinicPhone = 'phone' | 'mobile'

type Clinic = {
  id: number,
  attributes: {
    address: string,
    map: string,
    mobile: string,
    name: string,
    phone: string
  }
}

type ContactAttr = {
  clinics: {
    data: Clinic[]
  },
  email: string,
  openingHours: string
}

type Contact = {
  data: {
    id: number,
    attributes: ContactAttr
  }
}

export {
  ClinicPhone,
  Clinic,
  ContactAttr,
  Contact
}
