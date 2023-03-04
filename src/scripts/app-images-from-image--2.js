import '../styles/index.scss'

import * as dat from 'dat.gui'
import gsap from 'gsap'
import p5 from 'p5'

import Drag from './modules/Drag'

function init(_p5) {
  let drag = new Drag()

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // VARIABLES

  let settings = {
    algorithm: {
      fps: 60,
      pixel: {
        density: 5,
        size: 5,
        randomize: {
          x: true,
          y: true,
        },
      },
      noise: {
        scale: 0.003,
        duration: 1,
        pause: 3000,
        steps: 5,
      },
      speed: 0.0025,
      target: {
        x: 0,
        y: 0,
      },
    },
    colors: {
      background: {
        color: [30, 30, 30],
        alpha: 1,
      },
      primary: [255, 255, 255],
      secondary: [255, 255, 255],
    },
    texts: [
      {
        selector: '.text-container__headline--1',
        value: '',
        size: 72,
        animated: true,
        color: [255, 255, 255],
      },
      {
        selector: '.text-container__headline--2',
        value: '',
        size: 72,
        animated: true,
        color: [255, 255, 255],
      },
      {
        selector: '.text-container__headline--3',
        value: '',
        size: 72,
        animated: true,
        color: [255, 255, 255],
      },
    ],
    empty: {
      scale: 150,
      length: 10,
      array: [],
    },
  }

  for (let i = 0; i < settings.empty.length; i++) {
    settings.empty.array.push(setEmpty())
  }

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // DAT GUI

  const gui = new dat.GUI()

  // // // // // // // // // // // // // // // // // //
  // *** COLORS ***
  let colors = gui.addFolder('Colors')

  // ---> Background
  let background = colors.addFolder('Background')
  background.addColor(settings.colors.background, 'color')
  background.add(settings.colors.background, 'alpha').min(0).max(1).step(0.01)

  // ---> Primary
  colors.addColor(settings.colors, 'primary')

  // ---> Secondary
  colors.addColor(settings.colors, 'secondary')

  // // // // // // // // // // // // // // // // // //
  // *** ALGORITHM ***
  let algorithm = gui.addFolder('Algorithm')

  // ---> Speed
  algorithm.add(settings.algorithm, 'speed').min(0.001).max(0.01).step(0.0001)

  // ---> Density
  algorithm.add(settings.algorithm.pixel, 'density').min(1).max(100).step(1)

  // ---> Size
  algorithm.add(settings.algorithm.pixel, 'size').min(1).max(100).step(1)

  // ---> FPS
  algorithm.add(settings.algorithm, 'fps').min(1).max(60).step(1)

  // ---> Randomize
  let randomize = algorithm.addFolder('Randomize')
  randomize.add(settings.algorithm.pixel.randomize, 'x')
  randomize.add(settings.algorithm.pixel.randomize, 'y')

  // // // // // // // // // // // // // // // // // //
  // *** ALGORITHM ***
  let texts = gui.addFolder('Texts')
  settings.texts.forEach((_text, _index) => {
    texts.add(settings.texts[_index], 'value').onChange(() => {
      setTextValue(_text)
    })
    texts
      .add(_text, 'size')
      .min(1)
      .max(250)
      .step(1)
      .onChange(() => {
        setTextSize(_text)
      })
    texts.addColor(settings.texts[_index], 'color').onChange(() => {
      setTextColor(_text)
    })
  })

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // ZOOM ALGORITHM

  // setInterval(() => {
  //   // ---> Zoom
  //   let scaleTo = _p5.random(0.001, 0.005)

  //   gsap.to(settings.algorithm.noise, {
  //     scale: 0.001 + scaleTo,
  //     duration: settings.algorithm.noise.duration,
  //     ease: `steps(${settings.algorithm.noise.steps})`,
  //   })

  //   gsap.to(settings.algorithm.pixel, {
  //     size: 25 + (0.003 - scaleTo) * 3333,
  //     density: 25 + (0.003 - scaleTo) * 3333,
  //     duration: settings.algorithm.noise.duration,
  //     ease: `steps(${settings.algorithm.noise.steps})`,
  //   })

  //   gsap.to(settings.empty, {
  //     scale: 25 + (0.003 - scaleTo) * 3333,
  //     duration: settings.algorithm.noise.duration,
  //     ease: `steps(${settings.algorithm.noise.steps})`,
  //   })

  //   gsap.to('.ui__map__zoom', {
  //     width: `${scaleTo * 20000}%`,
  //     height: `${scaleTo * 20000}%`,
  //     duration: settings.algorithm.noise.duration,
  //     ease: `steps(${settings.algorithm.noise.steps})`,
  //   })

  //   // ---> Position Shift
  //   gsap.to(settings.algorithm.target, {
  //     x: _p5.random(-1, 1),
  //     y: _p5.random(-1, 1),
  //     duration: settings.algorithm.noise.duration,
  //     ease: `steps(${settings.algorithm.noise.steps})`,
  //   })

  //   // ---> Text
  //   settings.texts.forEach((_text, _index) => {
  //     if (_text.animated) {
  //       gsap.to(`.text-container__headline--${_index + 1}`, {
  //         scale: 1 + ((0.003 - scaleTo) * 333) / 4,
  //         // fontWeight: 600 * ((1 + (-0.003 + scaleTo) * 333) / 1.5),
  //         // fontStretch: `${100 + (-0.003 + scaleTo) * 333 * 25}%`,
  //         duration: settings.algorithm.noise.duration,
  //         ease: 'expo.inOut',
  //       })
  //     }
  //   })

  //   // ---> Empty
  //   const interval = setInterval(() => {
  //     for (let i = 0; i < settings.empty.length; i++) {
  //       settings.empty.array[i] = setEmpty()
  //     }
  //   }, (settings.algorithm.noise.duration * 1000) / settings.algorithm.noise.steps)

  //   setTimeout(() => {
  //     clearInterval(interval)
  //   }, settings.algorithm.noise.duration * 1000)
  // }, settings.algorithm.noise.pause)

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // IMAGES

  let images = []
  let orderedImages = []

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
    orderedImages[0] = _p5.loadImage('../images/order/1.jpeg')
    orderedImages[1] = _p5.loadImage('../images/order/2.jpeg')
    orderedImages[2] = _p5.loadImage('../images/order/3.jpeg')
    orderedImages[3] = _p5.loadImage('../images/order/4.jpeg')
    orderedImages[4] = _p5.loadImage('../images/order/5.jpeg')
    orderedImages[5] = _p5.loadImage('../images/order/6.jpeg')
    orderedImages[6] = _p5.loadImage('../images/order/7.jpeg')
    orderedImages[7] = _p5.loadImage('../images/order/8.jpeg')
    orderedImages[8] = _p5.loadImage('../images/order/9.jpeg')
    orderedImages[9] = _p5.loadImage('../images/order/10.jpeg')
    orderedImages[10] = _p5.loadImage('../images/order/11.jpeg')
    orderedImages[11] = _p5.loadImage('../images/order/12.jpeg')
    orderedImages[12] = _p5.loadImage('../images/order/13.jpeg')
    orderedImages[13] = _p5.loadImage('../images/order/14.jpeg')
    orderedImages[14] = _p5.loadImage('../images/order/15.jpeg')
    orderedImages[15] = _p5.loadImage('../images/order/16.jpeg')
    orderedImages[16] = _p5.loadImage('../images/order/17.jpeg')
    orderedImages[17] = _p5.loadImage('../images/order/18.jpeg')
    orderedImages[18] = _p5.loadImage('../images/order/19.jpeg')
    orderedImages[19] = _p5.loadImage('../images/order/20.jpeg')
  }

  preload()

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // SETUP

  _p5.setup = () => {
    _p5.createCanvas(_p5.windowWidth, _p5.windowHeight)
  }

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // DRAW

  let sinNormalized = 0

  _p5.draw = () => {
    _p5.frameRate(settings.algorithm.fps)
    _p5.background(settings.colors.background.color[0], settings.colors.background.color[1], settings.colors.background.color[2], settings.colors.background.alpha * 255)
    _p5.noStroke()

    // let sin = Math.abs(Math.round(Math.sin(_p5.frameCount / 100) * 10))

    sinNormalized += 0.1

    if (sinNormalized > 9) {
      sinNormalized = 0
    }

    images[5].loadPixels()

    for (let x = 0; x < images[5].width; x += settings.algorithm.pixel.size) {
      for (let y = 0; y < images[5].height; y += settings.algorithm.pixel.size) {
        // _p5.noiseDetail(2, 0.2)
        // noiseVal = _p5.noise(settings.algorithm.target.x + x * settings.algorithm.noise.scale, settings.algorithm.target.y + y * settings.algorithm.noise.scale - _p5.frameCount * settings.algorithm.speed, _p5.frameCount * settings.algorithm.speed)

        const pixelIndex = (x + y * images[5].width) * 4
        const r = images[5].pixels[pixelIndex + 0]
        const g = images[5].pixels[pixelIndex + 1]
        const b = images[5].pixels[pixelIndex + 2]

        const together = (r + g + b) / 3

        // fill(255 - 255 * limit + r, g * limit, b * limit)

        for (let i = 0; i < 10; i++) {
          if (together > i * 26 && together < 26 + i * 26) {
            _p5.image(orderedImages[i + Math.round(_p5.noise(x * 0.0025, y * 0.0025, _p5.frameCount / 500) * 5)], x + 50, y + 50, settings.algorithm.pixel.size, settings.algorithm.pixel.size)
          }
        }
      }
    }

    // for (let i = 0; i < settings.empty.array.length; i++) {
    //   // _p5.fill(0)
    //   _p5.image(images[i], settings.empty.array[i].position.x * settings.empty.scale, settings.empty.array[i].position.y * settings.empty.scale, settings.empty.array[i].size.y * settings.empty.scale, settings.empty.array[i].size.y * settings.empty.scale)
    //   // _p5.rect(settings.empty.array[i].position.x * settings.empty.scale, settings.empty.array[i].position.y * settings.empty.scale, settings.empty.array[i].size.x * settings.empty.scale, settings.empty.array[i].size.y * settings.empty.scale)
    // }
  }

  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // // // // // // // // // // // // // // // // // //
  // OTHER

  function resize() {
    window.onresize = () => {
      _p5.resizeCanvas(_p5.windowWidth, _p5.windowHeight)
    }
  }

  resize()

  function setTextSize(_text) {
    document.querySelector(_text.selector).style.fontSize = _text.size + 'px'
  }

  function setTextValue(_text) {
    document.querySelector(_text.selector).innerHTML = _text.value
  }

  function setTextColor(_text) {
    document.querySelector(_text.selector).style.color = `rgb(${_text.color[0]}, ${_text.color[1]}, ${_text.color[2]})`
  }

  settings.texts.forEach((_text) => {
    setTextSize(_text)
    setTextValue(_text)
    setTextColor(_text)
  })

  function setEmpty() {
    return {
      position: {
        x: Math.round(Math.round(_p5.random(0, _p5.windowWidth)) / 10),
        y: Math.round(Math.round(_p5.random(0, _p5.windowHeight)) / 10),
      },
      size: {
        x: Math.round(Math.round(_p5.random(0, _p5.windowWidth)) / 50),
        y: Math.round(Math.round(_p5.random(0, _p5.windowHeight)) / 50),
      },
    }
  }
}

new p5(init, 'capture')

// function setFontScale(_fontSize, _fontCopy, _fontWeight, _fontStrech) {
//   return new Promise((_resolve) => {
//     let fontSize = _fontSize
//     let copy = document.querySelector(_fontCopy)
//     let oldWeight = copy.style.fontWeight
//     let oldStretch = copy.style.fontStretch

//     copy.style.fontWeight = _fontWeight
//     copy.style.fontStretch = _fontStrech

//     const interval = setInterval(() => {
//       if (oldWeight != copy.style.fontWeight && oldStretch != copy.style.fontStretch) {
//         console.log(textRatio, copy.style.fontWeight, copy.style.fontStretch)
//         textRatio = (1 / copy.getBoundingClientRect().width) * fontSize
//         _resolve()
//         clearInterval(interval)
//       }
//     }, 10)
//   })
// }
