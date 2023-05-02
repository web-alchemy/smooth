import { Smooth } from '../../../src/smooth.js';

// feature detection
['shape-outside'].forEach(function(property) {
  // check if any variant exists, prefixed or not
  var isCapable = ['', '-webkit-', '-moz-', '-ms-'].some(function(prefix){
    return (prefix + property) in document.body.style;
  })

  if (isCapable) {
    document.documentElement.classList.add('shapes');
    // setup();
  }
});

const $ = document.querySelector.bind(document);

const $sceneIntro = $('.js-scene--intro'),
  $sceneOutro = $('.js-scene--outro'),
  $sceneAlice = $('.js-scene--alice'),
  $elContent  = $('.js-content'),
  $elTrack    = $('.js-timeline-track');

const introBox = $sceneIntro.getBoundingClientRect(),
  aliceBox = $sceneAlice.getBoundingClientRect(),
  contentBox = $elContent.getBoundingClientRect();

const smooth = new Smooth({
  value: [0],
  step: 0.075,
  accuracy: 0.001
})

window.addEventListener('scroll', () => {
  smooth.update([window.scrollY])
})

smooth.addEventListener('update', (event) => {
  const [scroll] = event.detail
  document.documentElement.style.setProperty('--scroll', scroll.toFixed(2))
})

document.documentElement.style.setProperty('--vh', window.innerHeight / 100)

$sceneIntro.style.setProperty('--start', introBox.top);
$sceneIntro.style.setProperty('--end', introBox.height / 4);
$sceneIntro.addEventListener('animationend', () => {
  $sceneIntro.classList.remove('scroll-scene')
  $sceneIntro.hidden = true
})

$sceneAlice.style.setProperty('--start', introBox.height / 4 + aliceBox.top);
$sceneAlice.style.setProperty('--end', introBox.height / 4 + aliceBox.top + aliceBox.height);
$sceneAlice.style.setProperty('--alice-box-height', aliceBox.height);

// scenes[scenes.length - 1].min * 1.4  + contentBox.top
$elContent.style.setProperty('--start', (introBox.height / 4 + aliceBox.top) * 1.4 + contentBox.top);
// scenes[scenes.length - 1].min * 1.4 + contentBox.top + contentBox.height
$elContent.style.setProperty('--end', (introBox.height / 4 + aliceBox.top) * 1.4 + contentBox.top + contentBox.height);
$elContent.style.setProperty('--content-top', contentBox.top)

// scenes[scenes.length - 1].max * 0.85
$sceneOutro.style.setProperty('--start', ((introBox.height / 4 + aliceBox.top) * 1.4 + contentBox.top + contentBox.height) * 0.85)
$sceneOutro.style.setProperty('--end', ((introBox.height / 4 + aliceBox.top) * 1.4 + contentBox.top + contentBox.height))

const max = Array.from(document.querySelectorAll('[style*="--end"]'))
  .map(element => element.style.getPropertyValue('--end'))
  .reduce((acc, item) => Math.max(acc, item))

$elTrack.style.height = window.innerHeight + max + "px";