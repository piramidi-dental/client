// @ts-expect-error: Unreachable code error
import * as ScrollMagic from 'scrollmagic'
import { gsap } from 'gsap'
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'

export default defineNuxtPlugin(() => {
  // @ts-expect-error: Unreachable code error
  ScrollMagicPluginGsap(ScrollMagic, gsap.timeline)
  return {
    provide: {
      scrollmagic: ScrollMagic
    }
  }
})
