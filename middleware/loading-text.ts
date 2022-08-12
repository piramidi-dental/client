
export default defineNuxtRouteMiddleware((to) => {
  const { setLoadingText } = useLoading()
  const loadingText = <string>to.meta.loadingText

  setLoadingText(loadingText)
})
