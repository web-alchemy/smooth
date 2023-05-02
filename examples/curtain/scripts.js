import { Smooth } from '../../src/smooth.js'

const smooth = new Smooth()

function getViewportH() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  )
}

function getMaxScroll() {
  return getDocumentHeight() - getViewportH()
}

const sceneElems = document.querySelectorAll('section.scene')

let maxScroll = getMaxScroll()
let part = maxScroll / sceneElems.length

document.documentElement.style.setProperty('--part', part)

sceneElems.forEach((element, index) => {
  element.style.setProperty('--index', index)
})

window.addEventListener('scroll', () => {
  smooth.update([window.scrollY])
})

smooth.addEventListener('update', (event) => {
  const scroll = event.detail[0]
  document.documentElement.style.setProperty('--scroll', scroll.toFixed(2))
})