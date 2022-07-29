
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading-store', () => {
  const isActive = ref<boolean>(false)
  const text = ref<string>('')

  const setTextHandler = (loadingText: string) => {
    text.value = loadingText
  }

  const activationHandler = (value: boolean) => {
    isActive.value = value
  }

  return {
    isActive,
    text,
    setTextHandler,
    activationHandler
  }
})
