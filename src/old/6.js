let settings = {
  pixel: {
    scale: 15,
    zoomRatio: 12.5,
  },
  noise: {
    scale: 0.01,
  },
  speed: 0.01,
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

function draw() {
  background(255)

  settings.noise.scale = (Math.sin(frameCount * 0.01) / settings.pixel.zoomRatio + 0.5) / 100

  for (let y = 0; y < height; y += settings.pixel.scale / 3) {
    for (let x = 0; x < width; x += settings.pixel.scale / 3) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, (frameCount * settings.speed) / 2.5)
      if (noiseVal > 0.15 && noiseVal < 0.2) {
        fill(255, 0, 255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      } else if (noiseVal > 0.2 && noiseVal < 0.25) {
        fill(0, 255, 255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      } else if (noiseVal > 0.25 && noiseVal < 0.3) {
        fill(255, 255, 255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      } else if (noiseVal > 0.3 && noiseVal < 0.35) {
        fill(255, 0, 255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      } else if (noiseVal > 0.35 && noiseVal < 0.4) {
        fill(0, 255, 255)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      }
    }
  }

  // fill(0)
  // textSize(250)
  // textStyle(BOLD)
  // text('Design', 50, 200)
  // text('a digitální', 50, 500)
  // text('technologie', 50, 800)

  for (let y = 0; y < height; y += settings.pixel.scale) {
    for (let x = 0; x < width; x += settings.pixel.scale) {
      noiseDetail(2, 0.2)
      noiseVal = noise(x * settings.noise.scale, y * settings.noise.scale - frameCount * settings.speed, (frameCount * settings.speed) / 2.5)
      if (noiseVal > 0.1 && noiseVal < 0.15) {
        fill(255, 255, 0)
        rect(x, y, settings.pixel.scale, settings.pixel.scale)
      }
    }
  }
}
