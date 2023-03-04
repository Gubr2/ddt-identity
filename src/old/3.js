let points = []
let settings = {
  pixels: {
    size: 20,
  },
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)
  // stroke(255)
  // strokeWeight(12)
  for (let i = 0; i < 12; i++) {
    points[i] = createVector(random(width), random(height))
  }

  pixelDensity(1)
}

function draw() {
  // loadPixels()
  for (let x = 0; x < width; x += settings.pixels.size) {
    for (let y = 0; y < height; y += settings.pixels.size) {
      let distances = []
      for (let i = 0; i < points.length; i++) {
        let d = dist(x, y, points[i].x, points[i].y)
        distances[i] = d
      }

      let sorted = sort(distances)
      let noise = sorted[0]
      let index = (x + y * width) * 4

      // pixels[index] = 0
      // pixels[index + 1] = 0
      // pixels[index + 2] = 0
      // pixels[index + 3] = 255
      noStroke()
      fill(waveColor(noise, noise, noise, 255))
      rect(Math.sin(frameCount * 0.1) * Math.random() * 100 + x, Math.cos(frameCount * 0.1) * Math.random() * 100 + y, settings.pixels.size, settings.pixels.size)
    }
  }
  // updatePixels()
  // background(0)
}

function waveColor(x, a, b, e) {
  if (x < 0) return b
  else return Math.pow(x / a, e) + b
}
