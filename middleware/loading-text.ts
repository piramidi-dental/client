
import { useLoadingStore } from '@/stores/loading'

export default defineNuxtRouteMiddleware((to) => {
  const loadingStore = useLoadingStore()
  const loadingText = <string>to.meta.loadingText

  loadingStore.setTextHandler(loadingText)
})
