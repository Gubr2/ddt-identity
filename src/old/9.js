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
  images.horse = loadImage('./static/horse.jpeg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(255, 255, 255, 10)

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)

      // ---> Generative
      if (noiseVal > 0.025 && noiseVal < 0.05) {
        fill(255, 0, 0)
        square(x, y, settings.pixel.scale)
      }
      if (noiseVal > 0.1 && noiseVal < 0.15) {
        fill(0, 0, 255)
        square(x, y, settings.pixel.scale)
      }
      if (noiseVal > 0.3 && noiseVal < 0.35) {
        fill(0, 255, 0)
        square(x, y, settings.pixel.scale)
      }

      // ---> Spawn Position
      if (noiseVal < settings.spawn.frequency) {
        for (let i = 0; i < images.array.length; i++) {
          if (images.flag && images.array[i].flag) {
            images.render.push({
              x,
              y,
              limit: 0,
              color: images.array[i].color,
              elapsedTime: 0,
            })

            images.flag = false

            setTimeout(() => {
              images.flag = true
              images.render.shift()
            }, settings.spawn.next)

            break
          }
        }
      }
    }
  }

  // // // // // // // // // // // // // //
  // ---> Spawn Render
  images.render.forEach((_image, _index) => {
    _image.elapsedTime++

    // ---> Animate In & Out
    _image.limit = Math.sin(_image.elapsedTime * (settings.speed * 5)) * 255

    // ---> Set Movement Speed
    let movement = Math.round(_image.elapsedTime * settings.speed * 10)

    // ---> Render Image
    images.horse.loadPixels()

    for (let x = 0; x < images.horse.width; x += settings.pixel.scale) {
      for (let y = 0; y < images.horse.height; y += settings.pixel.scale) {
        const pixelIndex = (x + y * images.horse.width) * 4
        const color = images.horse.pixels[pixelIndex + 0]

        if (color < _image.limit) {
          fill(255, 0, 0)
          square(x + _image.x - images.horse.width / 2, y + _image.y - images.horse.height / 2 + movement * 10, settings.pixel.scale)
        }
      }
    }
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
