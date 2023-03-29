
export default defineNuxtRouteMiddleware((to) => {
  const { setLoadingText } = useWaveController()
  const loadingText = <string>to.meta.title

  setLoadingText(loadingText)
})
