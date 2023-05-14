
import type { Clinic, ContactAttr, Contact } from '@/types/contacts'

export default () => {
  const { $apiParameters } = useNuxtApp()
  const { find } = useStrapi4()

  const clinicsList = useState<Clinic[]>('clinic-list', () => [])
  const contactInfo = useState<ContactAttr>('contact-info')

  const getContactEmail = computed(() => (contactInfo.value as ContactAttr).email)
  const getOpeningHours = computed(() => (contactInfo.value as ContactAttr).openingHours)

  const retriveClinicsData = async () => {
    try {
      const { data: contact, error } = await useAsyncData('contact', () => find<Contact>('contact', $apiParameters.population))

      if (error.value) {
        throw useRequestError(error.value as IRequestError)
      }

      contactInfo.value = (contact.value as Contact).data.attributes
      clinicsList.value = contactInfo.value.clinics.data
      clinicsList.value = clinicsList.value.map(clinic => (
        {
          ...clinic,
          attributes: {
            ...clinic.attributes,
            phone: `0${clinic.attributes.phone}`
          }
        }
      ))
    } catch (error) {
      showError(error as IRequestError)
    }
  }

  return {
    clinicsList,
    getContactEmail,
    getOpeningHours,
    retriveClinicsData
  }
}
