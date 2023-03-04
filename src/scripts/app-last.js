import '../styles/index.scss'

import gsap from 'gsap'
import p5 from 'p5'

let settings = {
  pixel: {
    scale: 100,
    zoomRatio: 12.5,
  },
  noise: {
    scale: 0.001,
  },
  speed: 0.01,
}

function init(_p5) {
  let images = []

  function preload() {
    images[0] = _p5.loadImage('./images/img00001.jpeg')
    images[1] = _p5.loadImage('../images/img00002.jpeg')
    images[2] = _p5.loadImage('../images/img00003.jpeg')
    images[3] = _p5.loadImage('../images/img00004.jpeg')
    images[4] = _p5.loadImage('../images/img00005.jpeg')
    images[5] = _p5.loadImage('../images/img00006.jpeg')
    images[6] = _p5.loadImage('../images/img00007.jpeg')
    images[7] = _p5.loadImage('../images/img00008.jpeg')
    images[8] = _p5.loadImage('../images/img00009.jpeg')
    images[9] = _p5.loadImage('../images/img00010.jpeg')
    images[10] = _p5.loadImage('../images/img00011.jpeg')
    images[11] = _p5.loadImage('../images/img00012.jpeg')
    images[12] = _p5.loadImage('../images/img00013.jpeg')
    images[13] = _p5.loadImage('../images/img00014.jpeg')
    images[14] = _p5.loadImage('../images/img00015.jpeg')
    images[15] = _p5.loadImage('../images/img00016.jpeg')
    images[16] = _p5.loadImage('../images/img00017.jpeg')
    images[17] = _p5.loadImage('../images/img00018.jpeg')
    images[18] = _p5.loadImage('../images/img00019.jpeg')
    images[19] = _p5.loadImage('../images/img00020.jpeg')
  }

  preload()

  _p5.setup = () => {
    _p5.createCanvas(window.innerWidth, window.innerHeight)
    _p5.noStroke()
  }

  _p5.draw = () => {
    _p5.background(255)

    settings.noise.scale = (Math.sin(_p5.frameCount * 0.01) / settings.pixel.zoomRatio + 0.5) / 500

    // for (let y = 0; y < _p5.height; y += settings.pixel.scale / 3) {
    //   for (let x = 0; x < _p5.width; x += settings.pixel.scale / 3) {
    //     _p5.noiseDetail(2, 0.2)
    //     noiseVal = _p5.noise(x * settings.noise.scale, y * settings.noise.scale - _p5.frameCount * settings.speed, (_p5.frameCount * settings.speed) / 2.5)
    //     if (noiseVal > 0.15 && noiseVal < 0.2) {
    //       _p5.fill(255, 0, 255)
    //       _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
    //     } else if (noiseVal > 0.2 && noiseVal < 0.25) {
    //       _p5.fill(0, 255, 255)
    //       _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
    //     } else if (noiseVal > 0.25 && noiseVal < 0.3) {
    //       _p5.fill(255, 255, 255)
    //       _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
    //     } else if (noiseVal > 0.3 && noiseVal < 0.35) {
    //       _p5.fill(255, 0, 255)
    //       _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
    //     } else if (noiseVal > 0.35 && noiseVal < 0.4) {
    //       _p5.fill(0, 255, 255)
    //       _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
    //     }
    //   }
    // }

    _p5.fill(0)
    _p5.textSize(200)
    _p5.textStyle(_p5.BOLD)
    _p5.text('Design', 50, 200)
    _p5.text('a digitální', 50, 400)
    _p5.text('technologie', 50, 600)

    for (let y = 0; y < _p5.height; y += settings.pixel.scale) {
      for (let x = 0; x < _p5.width; x += settings.pixel.scale) {
        _p5.noiseDetail(2, 0.2)
        noiseVal = _p5.noise(x * settings.noise.scale, y * settings.noise.scale - _p5.frameCount * settings.speed, (_p5.frameCount * settings.speed) / 2.5)
        if (noiseVal > 0.1 && noiseVal < 0.15) {
          _p5.image(images[0], x, y, 256, 256)
          // _p5.fill(255, 255, 0)
          // _p5.rect(x, y, settings.pixel.scale, settings.pixel.scale)
        }
      }
    }
  }
}

new p5(init, 'capture')
