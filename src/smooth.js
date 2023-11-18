/**
 * @typedef {Object} SmoothOptions
 * @property {number[]} value
 * @property {number[]} target
 * @property {number=0.1} step - value between 0 and 1
 * @property {number=0.001} accuracy
 */

class Smooth extends EventTarget {
  constructor(/** @type SmoothOptions */ options = {}) {
    super()
    /** @private */
    this.value = options.value || [0]
    /** @private */
    this.target = options.target || options.value
    /** @private */
    this.step = options.step || 0.1
    /** @private */
    this.accuracy = options.accuracy || 0.001
    /** @private */
    this.rafId = null
    /** @private */
    this.diff = new Array(this.target.length)
  }

  start() {
    this.rafId = requestAnimationFrame(this.loop)
  }

  stop() {
    cancelAnimationFrame(this._rafId)
    this.rafId = null
  }

  update(/** @type number[] */ value) {
    this.target = value
    if (!this.rafId) {
      this.start()
    }
  }

  /**
   * @private
   */
  loop = () => {
    let delta = 0
    this.target.forEach((item, index) => {
      const itemDiff = item - this.value[index]
      this.diff[index] = itemDiff
      delta = Math.max(delta, Math.abs(itemDiff))
    })

    if (delta < this.accuracy) {
      this.value = this.target
      this.stop()
    } else {
      this.value.forEach((item, index) => {
        this.value[index] = item + this.step * this.diff[index]
      })
      this.start()
    }

    this.dispatchEvent(new CustomEvent('update', {
      detail: this.value
    }))
  }
}

export default Smooth
export { Smooth }