import '../styles/index.scss'

import gsap from 'gsap'
import p5 from 'p5'

import Pages from './modules/Pages'
// import TextSeparator from './modules/TextSeparator'

const pages = new Pages()
// const textSeparator = new TextSeparator()
// textSeparator.separate([])

// // // // // // // // // // // // // // // // // // //
// SETTINGS

let settings = {
  shrinkSpeed: 0.0005,
  pixelSize: 400,
  noiseSize: 0.001,
  animationSpeed: 0.005,
  arrayLimit: 25,
  imageSizeVariations: 4,
  lifeDuration: 1000,
  repeatCount: 5,
}

function init(_p5) {
  // // // // // // // // // // // // // // // // // // //
  // CIRCLE
  class Circle {
    constructor(_x, _y, _r) {
      this.x = _x
      this.y = _y
      this.r = _r
      this.scale = {
        value: 0,
      }
      this.grow = 0
      this.growDirection = Math.round(_p5.random(0, 1)) ? true : false

      this.growing = true
      this.image = images[Math.round(_p5.random(19))]

      setTimeout(() => {
        circlesArray.shift()
      }, settings.lifeDuration)
    }

    show() {
      // _p5.fill(this.col  or)
      // _p5.rectMode(_p5.CENTER)
      // if (this.scale <= 0) {
      //   circlesArray.shift()
      // }
      // _p5.scale(0.5)
      this.grow += 0.005
      if (this.growDirection) {
        for (let i = 0; i < settings.repeatCount; i++) {
          _p5.image(this.image, this.x + this.grow * i, this.y + this.grow * i, this.r, this.r)
        }
      } else {
        for (let i = 0; i < settings.repeatCount; i++) {
          _p5.image(this.image, this.x - this.grow * i, this.y - this.grow * i, this.r, this.r)
        }
      }
    }
  }

  let circlesArray = []

  // // // // // // // // // // // // // // // // // // //
  // IMAGES

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

  // // // // // // // // // // // // // // // // // // //
  // SETUP

  _p5.setup = () => {
    _p5.createCanvas(_p5.windowWidth, _p5.windowHeight)
    _p5.noStroke()
    // _p5.frameRate(5)
  }

  // // // // // // // // // // // // // // // // // // //
  // DRAW

  _p5.draw = () => {
    // _p5.background(255)
    _p5.clear()
    _p5.noiseDetail(2, 0.2)

    // ---> Text
    // _p5.fill(0)
    // _p5.textSize(200)
    // _p5.textStyle(_p5.BOLD)
    // _p5.text('Design', 50, 200)
    // _p5.text('a digitální', 50, 400)
    // _p5.text('technologie', 50, 600)

    // ---> Perlin Noise
    for (let y = 0; y < _p5.height; y += settings.pixelSize / settings.imageSizeVariations) {
      for (let x = 0; x < _p5.width; x += settings.pixelSize / settings.imageSizeVariations) {
        noiseVal = _p5.noise(x * settings.noiseSize, y * settings.noiseSize + _p5.frameCount * settings.animationSpeed, _p5.frameCount * settings.animationSpeed)

        if (noiseVal > 0.3 && noiseVal < 0.325) {
          // ---> Add to Array
          newCircle(x, y)

          // ---> Display Array
          circlesArray.forEach((_circle, _index) => {
            // if (_circle.growing) {
            //   if (_circle.edges()) {
            //     _circle.growing = false
            //   } else {
            //     for (let i = 0; i < circlesArray.length; i++) {
            //       if (_index != i) {
            //         let d = _p5.dist(_circle.x, _circle.y, circlesArray[i].x, circlesArray[i].y)
            //         if (d < _circle.r + circlesArray[i].r) {
            //           _circle.growing = false
            //           break
            //         }
            //       }
            //     }
            //   }
            // }
            _circle.show()
            // _circle.grow()
          })
        }
      }
    }
  }

  function newCircle(_x, _y) {
    let valid = true

    this.randomizeValue = Math.round(_p5.random(1, settings.imageSizeVariations))

    for (let i = 0; i < circlesArray.length; i++) {
      let newImage = {
        x: _x,
        y: _y,
        width: settings.pixelSize / this.randomizeValue,
        height: settings.pixelSize / this.randomizeValue,
      }

      let testedImage = {
        x: circlesArray[i].x,
        y: circlesArray[i].y,
        width: circlesArray[i].r,
        height: circlesArray[i].r,
      }

      if (intersection(newImage, testedImage)) {
        valid = false
        break
      }
    }

    if (valid) {
      if (circlesArray.length < settings.arrayLimit) {
        circlesArray.push(new Circle(_x, _y, settings.pixelSize / this.randomizeValue))
      }
    }
  }

  function intersection(rect1, rect2) {
    var x1 = rect2.x,
      y1 = rect2.y,
      x2 = x1 + rect2.width,
      y2 = y1 + rect2.height
    if (rect1.x > x1) {
      x1 = rect1.x
    }
    if (rect1.y > y1) {
      y1 = rect1.y
    }
    if (rect1.x + rect1.width < x2) {
      x2 = rect1.x + rect1.width
    }
    if (rect1.y + rect1.height < y2) {
      y2 = rect1.y + rect1.height
    }
    return x2 <= x1 || y2 <= y1 ? false : true
  }
}

new p5(init, 'capture')
