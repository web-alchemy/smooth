# Smooth

Library for creating animations that depend on user interaction using the lerp technique.

## About LERP technique

- [David Khourshid. Lerp Technique.](https://frontendmasters.com/courses/css-animations/lerp-technique/)
- [Paul Lewis. Leaner, Meaner, Faster Animations with requestAnimationFrame. 2012](http://web.archive.org/web/20200421173252/https://www.html5rocks.com/en/tutorials/speed/animations/)

## Installation

```bash
npm install @web-alchemy/smooth
```

## Import

```javascript
// with bundlers
import { Smooth } from '@web-alchemy/smooth'

// import from `node_modules`
import { Smooth } from 'node_modules/@web-alchemy/smooth/dist/smooth.module.js'

// import from CDN
import { Smooth } from 'https://unpkg.com/@web-alchemy/smooth/dist/smooth.module.js'
```

## Using example - animated custom cursor

```html
<div class="cursor"></div>
```

```javascript
import { Smooth } from '@web-alchemy/smooth'

const cursor = document.querySelector('.cursor')

const initialValue = [window.innerWidth / 2, window.innerHeight / 2]

const smooth = new Smooth({
  value: initialValue, // array of numbers
  step: 0.075, // should be between 0 and 1
  accuracy: 0.001 // should be less than 1
})

function render(x, y) {
  cursor.style.setProperty('--x', x.toFixed(2))
  cursor.style.setProperty('--y', y.toFixed(2))
}

document.addEventListener('pointermove', (event) => {
  // store user values
  smooth.update([event.clientX, event.clientY])
})

// render interpolated values
smooth.addEventListener('update', (event) => {
  const [x, y] = event.detail
  render(x, y)
})

smooth.start()
// or
// render(initialValue[0], initialValue[1])
```

```css
.cursor {
  --_x: var(--x, 0);
  --_y: var(--y, 0);
  --_size: var(--size, 2rem);
  position: fixed;
  top: 0;
  left: 0;
  transform:
    translate3d(
      calc(var(--x) * 1px - 50%),
      calc(var(--y) * 1px - 50%),
      0
    );
  box-sizing: border-box;
  border: 2px solid;
  width: var(--_size);
  aspect-ratio: 1;
  border-radius: 50%;
}
```

## Examples

Run web server with examples for local testing

```bash
npm start
```

or check https://web-alchemy.github.io/smooth