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
        size: 1,
        randomize: {
          x: true,
          y: true,
        },
      },
      noise: {
        scale: 0.003,
        duration: 4,
      },
      speed: 0.005,
      target: {
        x: 0,
        y: 0,
      },
    },
    colors: {
      background: {
        color: [30, 30, 30],
        alpha: 0.1,
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
  algorithm.add(settings.algorithm.pixel, 'density').min(1).max(50).step(1)

  // ---> Size
  algorithm.add(settings.algorithm.pixel, 'size').min(1).max(200).step(1)

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

  setInterval(() => {
    // ---> Zoom
    let scaleTo = _p5.random(0.001, 0.005)

    gsap.to(settings.algorithm.noise, {
      scale: scaleTo,
      duration: settings.algorithm.noise.duration,
      ease: 'expo.inOut',
    })

    gsap.to('.ui__map__zoom', {
      width: `${scaleTo * 20000}%`,
      height: `${scaleTo * 20000}%`,
      duration: settings.algorithm.noise.duration,
      ease: 'expo.inOut',
    })

    // ---> Position Shift
    gsap.to(settings.algorithm.target, {
      x: _p5.random(-1, 1),
      y: _p5.random(-1, 1),
      duration: settings.algorithm.noise.duration,
      ease: 'expo.inOut',
    })

    // ---> Text
    settings.texts.forEach((_text, _index) => {
      if (_text.animated) {
        gsap.to(`.text-container__headline--${_index + 1}`, {
          scale: 1 + ((0.003 - scaleTo) * 333) / 4,
          // fontWeight: 600 * ((1 + (-0.003 + scaleTo) * 333) / 1.5),
          // fontStretch: `${100 + (-0.003 + scaleTo) * 333 * 25}%`,
          duration: settings.algorithm.noise.duration,
          ease: 'expo.inOut',
        })
      }
    })
  }, settings.algorithm.noise.duration * 1000)

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

  _p5.draw = () => {
    _p5.frameRate(settings.algorithm.fps)
    _p5.background(settings.colors.background.color[0], settings.colors.background.color[1], settings.colors.background.color[2], settings.colors.background.alpha * 255)
    _p5.noStroke()

    for (let y = 0; y < _p5.height; y += settings.algorithm.pixel.density) {
      for (let x = 0; x < _p5.width; x += settings.algorithm.pixel.density) {
        let randomizeX = settings.algorithm.pixel.randomize.x ? _p5.random(0, 1) : 1
        let randomizeY = settings.algorithm.pixel.randomize.y ? _p5.random(0, 1) : 1

        _p5.noiseDetail(2, 0.2)
        noiseVal = _p5.noise(settings.algorithm.target.x + x * settings.algorithm.noise.scale, settings.algorithm.target.y + y * settings.algorithm.noise.scale - _p5.frameCount * settings.algorithm.speed, _p5.frameCount * settings.algorithm.speed)

        if (noiseVal > 0.1 && noiseVal < 0.125) {
          _p5.fill(settings.colors.secondary[0], settings.colors.secondary[1], settings.colors.secondary[2])
          _p5.fill(settings.colors.secondary[0], settings.colors.secondary[1], settings.colors.secondary[2])

          _p5.rect(x, y, settings.algorithm.pixel.size * randomizeX, settings.algorithm.pixel.size * randomizeY)
        }
        if (noiseVal > 0.3 && noiseVal < 0.325) {
          _p5.fill(settings.colors.primary[0], settings.colors.primary[1], settings.colors.primary[2])
          _p5.fill(settings.colors.primary[0], settings.colors.primary[1], settings.colors.primary[2])

          _p5.rect(x, y, settings.algorithm.pixel.size * randomizeX, settings.algorithm.pixel.size * randomizeY)
        }
      }
    }
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
