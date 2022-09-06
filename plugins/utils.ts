
export default defineNuxtPlugin(() => {
  const globalUtils = {
    kebabToDashesConverter: (value: string) => value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`),
    capitalizeString: (value: string, isLower = false, onlyFirstChart = true) => {
      const firstLetter = ['¿', '¡'].includes(value[0]) ? 1 : 0
      const fnType = isLower ? 'toLowerCase' : 'toUpperCase'
      const stringToConvert = onlyFirstChart ? value.toLowerCase() : value

      return stringToConvert.replace(stringToConvert[firstLetter], stringToConvert[firstLetter][fnType]())
    }
  }

  return {
    provide: {
      globalUtils
    }
  }
})
