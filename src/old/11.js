let settings = {
  pixel: {
    scale: 15,
    zoomRatio: 15,
  },
  noise: {
    scale: 0.005,
  },
  speed: 0.005,
  spawn: {
    frequency: 0.075,
    next: 3000,
  },
}

let images = {
  horse: null,
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

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

function preload() {
  images.horse = loadImage('./static/stable.png')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  // background(255, 255, 255, 10)

  // // // // // // // // // // // // // // // // // // //
  // IMAGE

  images.horse.loadPixels()

  for (let x = 0; x < window.innerWidth; x += settings.pixel.scale) {
    for (let y = 0; y < window.innerHeight; y += settings.pixel.scale) {
      const pixelIndex = (x + y * images.horse.width) * 4
      const color = images.horse.pixels[pixelIndex + 0]

      fill(color, color, color, color)
      square(x, y, settings.pixel.scale)
    }
  }

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      // ---> Generative

      if (noiseVal > 0.1 && noiseVal < 0.15) {
        fill(0)
        square(x, y, settings.pixel.scale)
      }
      if (noiseVal > 0.3 && noiseVal < 0.35) {
        fill(0)
        square(x, y, settings.pixel.scale)
      }
    }
  }
}
