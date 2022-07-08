
import { BasicOpt, PlxOpt } from './types'

export default () => {
  const parallax = (options: PlxOpt) : void => {
    const { $scrollmagic, $gsap } = useNuxtApp()
    const controller = new $scrollmagic.Controller()
    const tween = $gsap.timeline()
    const { dataTween, triggerHook, duration } = options

    tween[dataTween.fn](dataTween.el, dataTween.from, dataTween.to)
    const sceneData: BasicOpt = {
      duration: duration || '100%'
    }

    if (triggerHook) { sceneData.triggerHook = triggerHook }

    new $scrollmagic
      .Scene(sceneData)
      .setTween(tween)
      .addTo(controller)
  }

  return {
    parallax
  }
}
