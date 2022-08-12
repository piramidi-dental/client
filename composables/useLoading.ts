
export default () => {
  const loadingView = useState<ILoading>('loading-view', () => ({
    isActive: false,
    text: ''
  }))

  const setLoadingText = (text: string) => {
    loadingView.value.text = text
  }

  const handleLoadingActivation = (value: boolean) => {
    loadingView.value.isActive = value
  }

  return {
    setLoadingText,
    handleLoadingActivation
  }
}
