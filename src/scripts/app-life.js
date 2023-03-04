import '../styles/index.scss'

import gsap from 'gsap'
import p5 from 'p5'

// // // // // // // // // // // // // // // // // // //
// SETTINGS

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
  // // // // // // // // // // // // // // // // // // //
  // CIRCLE
  class Circle {
    constructor(_x, _y, _r) {
      this.x = _x
      this.y = _y
      this.r = _r

      this.growing = true
    }

    grow() {
      if (this.growing) {
        this.r++
      }
    }

    edges() {
      if (this.x + this.r > innerWidth || this.x - this.r < 0 || this.y + this.r > innerHeight || this.y - this.r < 0) {
        return true
      }
    }

    show() {
      _p5.fill(255)
      _p5.ellipse(this.x, this.y, this.r * 2)
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
  }

  // // // // // // // // // // // // // // // // // // //
  // DRAW

  _p5.draw = () => {
    _p5.background(0)

    // ---> Add to Array
    newCircle()

    // ---> Display Array
    circlesArray.forEach((_circle, _index) => {
      if (_circle.growing) {
        if (_circle.edges()) {
          _circle.growing = false
        } else {
          for (let i = 0; i < circlesArray.length; i++) {
            if (_index != i) {
              let d = _p5.dist(_circle.x, _circle.y, circlesArray[i].x, circlesArray[i].y)
              if (d < _circle.r + circlesArray[i].r) {
                _circle.growing = false
                break
              }
            }
          }
        }
      }
      _circle.show()
      _circle.grow()
    })
  }

  function newCircle() {
    let randomX = _p5.random(innerWidth)
    let randomY = _p5.random(innerHeight)

    let valid = true

    for (let i = 0; i < circlesArray.length; i++) {
      let d = _p5.dist(randomX, randomY, circlesArray[i].x, circlesArray[i].y)
      if (d < circlesArray[i].r) {
        valid = false
        break
      }
    }

    if (valid) {
      if (circlesArray.length < 10) {
        circlesArray.push(new Circle(randomX, randomY, 0))
      }
    }
  }
}

new p5(init, 'capture')
