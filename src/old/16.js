let settings = {
  pixel: {
    scale: 10,
    zoomRatio: 15,
  },
  noise: {
    scale: 0.0035,
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

setInterval(() => {
  gsap.to(target.current, {
    x: Math.random() * 2,
    y: Math.random() * 2,
    duration: 4,
    ease: 'expo.inOut',
  })

  gsap.to(settings.noise, {
    scale: random(0.001, 0.005),
    duration: 4,
    ease: 'expo.inOut',
  })
}, 3000)

let ascii = ['4, 0, D, T']

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(0, 0, 0)

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(target.current.x + x * settings.noise.scale, target.current.y + y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      if (noiseVal > 0.1 && noiseVal < 0.125) {
        textStyle(BOLD)
        text(ascii[Math.round(random(0, 3))], x, y)
      }
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        textStyle(BOLD)
        text(ascii[Math.round(random(0, 3))], x, y)
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
