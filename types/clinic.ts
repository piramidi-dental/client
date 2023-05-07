
type DoctorAttributes = {
  name: string,
  experience: string,
  roles: string,
  uuid: string
}

type Doctor = {
  attributes: DoctorAttributes
  id: number
}

type DoctorListAttributes = {
  description: string,
  doctors: { data: Doctor[] }
}

type Doctors = {
  data: {
    attributes: DoctorListAttributes
    id: number
  }
}

export {
  DoctorAttributes,
  Doctor,
  DoctorListAttributes,
  Doctors
}
