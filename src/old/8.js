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
    duration: 5000,
    next: 3000,
  },
}

let images = {
  horse: null,
  flag: true,
  position: {
    x: 0,
    y: 0,
  },
  array: [1, 2, 3],
}

// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // //

// let limit = 0

function preload() {
  images.horse = loadImage('./static/horse.jpeg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(255)

  let firstPointFlag = true
  let positionCount = 0

  //

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      // ---> Spawn Position
      if (noiseVal < settings.spawn.frequency) {
        positionCount++

        if (firstPointFlag) {
          images.position.y = y
          images.position.x = x
        }

        firstPointFlag = false
      }

      fill(noiseVal * 255)
      square(x, y, settings.pixel.scale)
    }
  }

  // ---> Spawn Render
  if (!positionCount) {
    images.position.y = 0
    images.position.x = 0
  } else {
    if (images.flag) {
      renderImage()
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

function renderImage() {
  fill('red')
  square(images.position.x, images.position.y, settings.pixel.scale)
}
