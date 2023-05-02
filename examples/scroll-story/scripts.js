import { Smooth } from '../../src/smooth.js';

const root = document.documentElement;
const body = document.body;
const page = document.querySelector('.page');
const container = document.querySelector('.container');

let scroll = window.scrollY;

const smooth = new Smooth({
  value: [0],
  step: 0.075,
  accuracy: 0.001,
})

function getDocumentScrollHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}

function getViewHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
}

/**
 * Set styles to DOM Node
 * @param {HTMLElement} element - DOM element
 * @param {Object} styles - object with styles
 *
 * example:
 * ```
 * setStyle(document.body, {
 *   'height': '200vh',
 *   'paddingTop': '20px'
 * })
 * ```
 */
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

function initVideoSection() {
  const section = document.querySelector('.video-section');
  if (!section) return;

  const box = section.getBoundingClientRect();

  setStyles(section, {
    '--start': scroll + box.top,
    '--end': scroll + box.top + box.height - getViewHeight()
  })
}

function initTextSection() {
  const section = document.querySelector('.text-section');
  if (!section) return;

  const text = section.querySelector('.text-section__content');

  const box = section.getBoundingClientRect();
  const textBox = text.getBoundingClientRect();

  setStyles(section, {
    '--start': scroll + box.top
  });
  setStyles(text, {
    '--start': scroll + textBox.top - getViewHeight() / 2
  })
}

// init
window.addEventListener('load', function() {
  initVideoSection();
  initTextSection();

  calculateSizes();
  window.addEventListener('resize', calculateSizes);

  render(window.scrollY);

  window.addEventListener('scroll', () => {
    smooth.update([window.scrollY])
  }, { passive: true });

  smooth.addEventListener('update', (event) => {
    render(event.detail[0])
  })
});
