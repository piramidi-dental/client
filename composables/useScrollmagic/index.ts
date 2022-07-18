
import {
  BasicOpt,
  tweenOpt
} from './types'

export default () => {
  const parallax = (options: tweenOpt) : HTMLElement => {
    const { $scrollmagic, $gsap } = useNuxtApp()
    const controller = new $scrollmagic.Controller()
    const tween = $gsap.timeline()
    const { dataTween, triggerHook, duration } = options

    tween[dataTween.fn](dataTween.el, dataTween.from, dataTween.to)
    const sceneData: BasicOpt = {
      duration: duration || '100%'
    }

    if (triggerHook) { sceneData.triggerHook = triggerHook }

    return new $scrollmagic
      .Scene(sceneData)
      .setTween(tween)
      .addTo(controller)
  }

  const stylesEffect = (options: tweenOpt) : HTMLElement => {
    const { $scrollmagic, $gsap } = useNuxtApp()
    const controller = new $scrollmagic.Controller()
    const tween = $gsap.timeline()
    const { dataTween, offset, duration } = options

    tween[dataTween.fn](dataTween.el, dataTween.from, dataTween.to)

    return new $scrollmagic
      .Scene({ offset, duration })
      .setTween(tween)
      .addTo(controller)
  }

  return {
    parallax,
    stylesEffect
  }
}
