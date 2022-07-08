
export default () => {
  const windowWidth = useState<number>('windowWidth', () => 0)

  useEventListener('resize', () : void => {
    windowWidth.value = <number>window.innerWidth
  })

  return windowWidth
}
