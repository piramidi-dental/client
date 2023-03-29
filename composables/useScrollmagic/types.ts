
interface BasicOpt {
  triggerHook?: string | number,
  duration?: string | number,
  offset?: number
}

interface FromTo {
  x?: number,
  y?: number,
  duration?: number | string,
  ease?: string,
  css?: object
}

interface tweenOpt extends BasicOpt {
  dataTween: {
    fn: string,
    el: string | HTMLElement,
    from?: FromTo
    to: FromTo
  }
}

export {
  BasicOpt,
  tweenOpt
}
