
export default defineNuxtPlugin(() => {
  const globalUtils = {
    kebabToDashesConverter: (value: string) => value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
  }

  return {
    provide: {
      globalUtils
    }
  }
})
