export const throttle = (fn: Function, time: number) => {
  let start: number = null

  return function() {
    const now = Date.now()
    if (!start || now - start >= time) {
      start = now
      fn()
    }
  }
}

export const debounce = function(func: Function, wait: number) {
  let timer: number
  return function() {
    !!timer && clearTimeout(timer)
    timer = setTimeout(func, wait)
  }
}

const a = {
  s: 1,
}
