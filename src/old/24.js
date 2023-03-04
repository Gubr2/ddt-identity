document.querySelector('.text-container').style.display = 'none'
document.querySelector('.text-container_2').style.display = 'none'

let settings = {
  pixel: {
    scale: 5,
    zoomRatio: 15,
  },
  noise: {
    scale: 0.003,
    duration: 4,
  },
  speed: 0.005,
  spawn: {
    frequency: 0.075,
    next: 3000,
  },
}

let images = {
  flag: true,
  array: [
    {
      limit: 0,
      flag: true,
      color: 'red',
    },
  ],
  render: [],
}

let target = {
  current: {
    x: 0,
    y: 0,
  },
}

let baseTextSize = document.querySelector('.headline__base').getBoundingClientRect().width
let textRatio = 1

setInterval(() => {
  // ---> Posun
  gsap.to(target.current, {
    x: Math.random() * 2,
    y: Math.random() * 2,
    duration: settings.noise.duration,
    ease: 'expo.inOut',
  })

  // ---> Zoom
  let scaleTo = random(0.001, 0.005)

  gsap.to(settings.noise, {
    scale: scaleTo,
    duration: settings.noise.duration,
    ease: 'expo.inOut',
  })

  gsap.to('.ui__map__zoom', {
    width: `${scaleTo * 20000}%`,
    height: `${scaleTo * 20000}%`,
    duration: settings.noise.duration,
    ease: 'expo.inOut',
  })

  // ---> Text

  gsap.to('.text-container__autoscale', {
    fontWeight: 600 * ((1 + (-0.003 + scaleTo) * 333) / 1.5),
    scale: 1 + ((-0.003 + scaleTo) * 333) / 4,
    fontStretch: `${100 + (-0.003 + scaleTo) * 333 * 25}%`,
    duration: settings.noise.duration,
    ease: 'expo.inOut',
  })
}, settings.noise.duration * 1000)

function setFontScale(_fontSize, _fontCopy, _fontWeight, _fontStrech) {
  return new Promise((_resolve) => {
    let fontSize = _fontSize
    let copy = document.querySelector(_fontCopy)
    let oldWeight = copy.style.fontWeight
    let oldStretch = copy.style.fontStretch

    copy.style.fontWeight = _fontWeight
    copy.style.fontStretch = _fontStrech

    const interval = setInterval(() => {
      if (oldWeight != copy.style.fontWeight && oldStretch != copy.style.fontStretch) {
        console.log(textRatio, copy.style.fontWeight, copy.style.fontStretch)
        textRatio = (1 / copy.getBoundingClientRect().width) * fontSize
        _resolve()
        clearInterval(interval)
      }
    }, 10)
  })
}

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(30, 30, 30, 10)

  noStroke()

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(target.current.x + x * settings.noise.scale, target.current.y + y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      if (noiseVal > 0.1 && noiseVal < 0.125) {
        fill(255)
        rect(x, y, (settings.pixel.scale / 8) * Math.random() - 0.5, settings.pixel.scale * Math.random() - 0.5)
      }
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        fill(255)
        rect(x, y, (settings.pixel.scale / 8) * Math.random() - 0.5, settings.pixel.scale * Math.random() - 0.5)
      }
    }
  }

  // // // // // // // // // // // // // // // // // // //
  // IMAGE

  // images.horse.loadPixels()

  // for (let x = 0; x < images.horse.width; x += settings.pixel.scale) {
  //   for (let y = 0; y < images.horse.height; y += settings.pixel.scale) {
  //     const pixelIndex = (x + y * images.horse.width) * 4
  //     const color = images.horse.pixels[pixelIndex + 0]

  //     if (color < limit) {
  //       fill(0)
  //       square(x, y, settings.pixel.scale)
  //     }
  //   }
  // }

  // if (limit < 240) {
  //   limit++
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
