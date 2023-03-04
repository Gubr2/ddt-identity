let settings = {
  pixel: {
    scale: 10,
  },
  noise: {
    scale: 0.005,
  },
  speed: 0.01,
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, frameCount * settings.speed)
      if (noiseVal > 0.25) {
        fill(255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      } else {
        fill(0)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      }
    }
  }
}
