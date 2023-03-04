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
  array: [
    {
      flag: true,
      color: 'red',
    },
    {
      flag: true,
      color: 'blue',
    },
    {
      flag: true,
      color: 'red',
    },
  ],
  render: [],
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
  // noStroke()
}

function draw() {
  background(255)

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      fill(noiseVal * 255)

      // ---> Spawn Position
      if (noiseVal < settings.spawn.frequency) {
        for (let i = 0; i < images.array.length; i++) {
          if (images.flag && images.array[i].flag) {
            images.render.push({
              x,
              y,
              color: images.array[i].color,
            })

            images.flag = false

            setTimeout(() => {
              images.flag = true
              images.render.shift()
            }, settings.spawn.next)

            images.array[i].flag = false

            setTimeout(() => {
              images.array[i].flag = true
            }, settings.spawn.duration)

            break
          }
        }
      } else {
        fill(noiseVal * 255)
      }

      square(x, y, settings.pixel.scale)
    }
  }

  // ---> Spawn Render

  images.render.forEach((_image, _index) => {
    fill(_image.color)

    square(_image.x, _image.y, settings.pixel.scale)
  })

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
