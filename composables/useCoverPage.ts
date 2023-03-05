
interface ICoverPage {
  data: {
    attributes: {
      cover: {
        data: {
          attributes: {
            [key: string]: string | number | null
          }
        }
      }
    }
  }[]
}

export default async (activePage: string) => {
  try {
    const { $apiParameters } = useNuxtApp()
    const { findOne } = useStrapi4()

    const { data: page, error } = await useAsyncData('pages', () => findOne<ICoverPage>('pages', {
      ...$apiParameters.population,
      ...$apiParameters.filters('name', activePage)
    }))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    return (page.value as ICoverPage).data[0].attributes.cover.data.attributes
  } catch (error) {
    showError(error as IRequestError)
  }
}
