let settings = {
  pixel: {
    scale: 15,
    zoomRatio: 15,
  },
  noise: {
    scale: 0.003,
  },
  speed: 0.0025,
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

let limit = 0

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

function preload() {
  images.horse = loadImage('./static/stable.jpeg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(255, 255, 255, 10)

  // // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // // //

  // // // // // // // // // // // // // // // // // // //
  // TEXT

  fill(0)
  textSize(200)
  textStyle(BOLD)
  text('Design', 50, 200)
  text('a digitální', 50, 400)
  text('technologie', 50, 600)

  // // // // // // // // // // // // // // // // // // //
  // GENERATIVE

  settings.noise.scale = (Math.sin(frameCount * 0.01) / settings.pixel.zoomRatio + 0.5) / 150

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, (frameCount * settings.speed) / 2.5)

      // ---> Generative

      if (noiseVal > 0.025 && noiseVal < 0.05) {
        fill(0, 0, 0)
        square(x, y, settings.pixel.scale)
      }
      if (noiseVal > 0.1 && noiseVal < 0.125) {
        fill(0, 0, 0)
        square(x, y, settings.pixel.scale)
      }
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        fill(0, 0, 0)
        square(x, y, settings.pixel.scale)
      }
    }
  }

  // // // // // // // // // // // // // // // // // // //
  // IMAGE

  // images.horse.loadPixels()

  // for (let x = 0; x < images.horse.width * limit; x += settings.pixel.scale) {
  //   for (let y = 0; y < images.horse.height * limit; y += settings.pixel.scale) {
  //     const pixelIndex = (x + y * images.horse.width) * 4
  //     const r = images.horse.pixels[pixelIndex + 0]
  //     const g = images.horse.pixels[pixelIndex + 1]
  //     const b = images.horse.pixels[pixelIndex + 2]

  //     // fill(255 - 255 * limit + r, g * limit, b * limit)
  //     fill(r * limit, g * limit, b * limit)
  //     square(x, y + Math.round(frameCount * settings.speed * 10) * 10, settings.pixel.scale)
  //   }
  // }

  // limit = Math.abs(Math.sin(frameCount / 100))
}
