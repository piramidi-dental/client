
interface BasicOpt {
  triggerHook?: string | number,
  duration?: string | number
}

interface FromTo {
  x?: number,
  y?: number,
  duration?: number | string,
  ease?: string
}

interface PlxOpt extends BasicOpt {
  dataTween: {
    fn: string,
    el: string,
    from?: FromTo
    to: FromTo
  }
}

export {
  BasicOpt,
  PlxOpt
}
