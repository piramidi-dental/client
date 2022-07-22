
export default (event:string, callback: () => void) : void => {
  onMounted(() => window.addEventListener(event, callback))

  onUnmounted(() => window.removeEventListener(event, callback))
}
