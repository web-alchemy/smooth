import { Smooth } from '../../src/smooth.js';

const root = document.documentElement;
const page = document.querySelector('.page');

const smooth = new Smooth({
  value: [0],
  step: 0.075,
  accuracy: 0.001,
})

function getViewHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
}

function setStyles(element, styles) {
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  })
}

function render(scroll) {
  setStyles(root, {
    '--scroll': scroll.toFixed(2)
  });
}

function calculateSizes() {
  const viewHeight = getViewHeight();
  const pageHeight = page.offsetHeight;
  setStyles(root, {
    '--scroll-height': pageHeight,
    '--max-scroll': pageHeight - viewHeight,
    '--vh': viewHeight * 0.01,
    '--vw': window.innerWidth * 0.01
  });
}

window.addEventListener('load', function() {
  calculateSizes();
  window.addEventListener('resize', calculateSizes);

  render(window.scrollY);

  document.querySelector('input[type="range"]').addEventListener('input', (event) => {
    setStyles(root, {
      '--image-offset': event.target.value
    })
  });

  window.addEventListener('scroll', () => {
    smooth.update([window.scrollY])
  }, { passive: true });

  smooth.addEventListener('update', (event) => {
    render(event.detail[0])
  })
});
