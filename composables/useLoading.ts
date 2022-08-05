
export default () => {
  const loadingIsActive = useState<boolean>('isActive', () => false)
  const loadingText = useState<string>('loadingText', () => '')

  const setLoadingText = (text: string) => {
    loadingText.value = text
  }

  const handleLoadingActivation = (value: boolean) => {
    loadingIsActive.value = value
  }

  return {
    loadingIsActive,
    loadingText,
    setLoadingText,
    handleLoadingActivation
  }
}
