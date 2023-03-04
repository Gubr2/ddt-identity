let settings = {
  pixel: {
    scale: 10,
    zoomRatio: 15,
  },
  noise: {
    scale: [2500, 2000, 1500],
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

let particles = []

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

function preload() {
  images.horse = loadImage('./static/horse.jpeg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(255, 255, 255, 10)

  // // // // // // // // // // // // // // // // // // //
  // TEXT

  fill(0)
  textSize(125)
  textStyle(BOLD)
  text('Design', 50, 200)
  text('a digitální', 50, 325)
  text('technologie', 50, 450)

  // // // // // // // // // // // // // // // // // // //
  // GENERATIVE

  //
  // * 0 *
  //

  settings.noise.scale[0] -= 5

  // ---> Reset
  if (settings.noise.scale[0] < 500) {
    settings.noise.scale[0] = 2500
  }

  // ---> Loop
  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)

      // ---> Generative
      noiseVal = noise((x / (settings.noise.scale[0] * 2)) * 10, (y / (settings.noise.scale[0] * 2)) * 10 - frameCount * settings.speed, frameCount * settings.speed)
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        fill(0, 255, 0, ((settings.noise.scale[0] - 500) / 2000) * 255)
        square(x, y, settings.pixel.scale)
      }
    }
  }

  //
  // * 1 *
  //

  settings.noise.scale[1] -= 5

  // ---> Reset
  if (settings.noise.scale[1] < 500) {
    settings.noise.scale[1] = 2500
  }

  // ---> Loop
  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)

      // ---> Generative
      noiseVal = noise((x / (settings.noise.scale[1] * 2)) * 10, (y / (settings.noise.scale[1] * 2)) * 10 - frameCount * settings.speed, frameCount * settings.speed)
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        fill(0, 255, 0, ((settings.noise.scale[1] - 500) / 2000) * 255)
        square(x, y, settings.pixel.scale)
      }
    }
  }

  //
  // * 2 *
  //

  settings.noise.scale[2] -= 5

  // ---> Reset
  if (settings.noise.scale[2] < 500) {
    settings.noise.scale[2] = 2500
  }

  // ---> Loop
  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)

      // ---> Generative
      noiseVal = noise((x / (settings.noise.scale[2] * 2)) * 10, (y / (settings.noise.scale[2] * 2)) * 10 - frameCount * settings.speed, frameCount * settings.speed)
      if (noiseVal > 0.3 && noiseVal < 0.325) {
        fill(0, 255, 0, ((settings.noise.scale[2] - 500) / 2000) * 255)
        square(x, y, settings.pixel.scale)
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
