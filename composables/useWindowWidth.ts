
export default () => {
  const windowWidth = useState<number>('window-width', () => 0)

  const setWindowWidth = () => {
    windowWidth.value = <number>window.innerWidth

    const vh = <number>window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  useEventListener('resize', setWindowWidth)

  onMounted(setWindowWidth)

  return {
    windowWidth
  }
}
