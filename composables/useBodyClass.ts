
export default () => {
  const bodyList = useState<string[]>('body-list', () => ['main-body'])

  const addRemoveBodyClass = (bodyClass: string, toRemove = <boolean>false) => {
    toRemove
      ? bodyList.value = bodyList.value.filter(el => el !== bodyClass)
      : bodyList.value.push(bodyClass)
  }

  return {
    addRemoveBodyClass
  }
}
