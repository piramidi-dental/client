
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
    const opt = { name: { $eq: activePage } }

    const { data: page, error } = await useCustomFetch(`/api/pages?${$apiParameters.filters(opt)}`, { key: 'pages' })

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    return (page.value as ICoverPage).data[0].attributes.cover.data.attributes
  } catch (error) {
    throwError(error as Error)
  }
}
