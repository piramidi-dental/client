
export default defineNuxtPlugin(() => {
  const globalUtils = {
    kebabToDashesConverter: (value: string) : string => value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`),
    capitalizeString: (value: string, isLower = false, onlyFirstChart = true) : string => {
      const firstLetter = ['¿', '¡'].includes(value[0]) ? 1 : 0
      const fnType = isLower ? 'toLowerCase' : 'toUpperCase'
      const stringToConvert = onlyFirstChart ? value.toLowerCase() : value

      return stringToConvert.replace(stringToConvert[firstLetter], stringToConvert[firstLetter][fnType]())
    },
    stringSplitter: (value: string, lengths: number[]) : string => (lengths.map(((p:number) => (i:number) => {
      const substring = value.slice(p, p += i)
      return substring
    })(0)).join(' '))
  }

  const apiParameters = {
    population: { populate: '*' },
    filters: (key: string, value: string) => ({ filters: { [key]: value } })
  }

  const phoneFormatter = {
    phone: (value: string) : string => globalUtils.stringSplitter(value, [4, 3, 3]),
    mobile: (value: string) : string => globalUtils.stringSplitter(value, [3, 2, 2, 3])
  }

  const composeImageUri = (url: string): string => {
    const { strapi: { url: baseURL } } = useRuntimeConfig()
    return baseURL + url
  }

  return {
    provide: {
      globalUtils,
      apiParameters,
      phoneFormatter,
      composeImageUri
    }
  }
})
