import gsap from 'gsap'

export default class Slides {
  constructor() {
    this.index = 0
    this.selector = [...document.querySelectorAll('.slide')]

    // this.toggleFlag = true
    document.querySelector('.dg').style.display = 'none'

    this.setControl()
    this.toggleControl()
  }

  setControl() {
    document.addEventListener('keydown', (_e) => {
      _e = _e || window.event

      if (_e.key == 'ArrowLeft') {
        if (!this.index == 0) {
          this.index--
          this.setSlide()
        }
      } else if (_e.key == 'ArrowRight') {
        if (this.index < this.selector.length - 1) {
          this.index++
          this.setSlide()
        }
      }
    })
  }

  toggleControl() {
    document.querySelector('.slide__controls').addEventListener('click', () => {
      document.querySelector('.dg').classList.toggle('dg--active')
      // if (this.toggleFlag) {
      //   document.querySelector('.dg').style.display = 'none'
      //   this.toggleFlag = false
      // } else {
      //   document.querySelector('.dg').style.display = 'block'
      //   this.toggleFlag = true
      // }
    })
  }

  setSlide() {
    document.querySelector('.slide--active').classList.remove('slide--active')
    this.selector[this.index].classList.add('slide--active')

    // ---> Toggle P5 Canvas
    if (this.selector[this.index].getAttribute('data-processing')) {
      document.querySelector('main').style.display = 'none'
    } else {
      document.querySelector('main').style.display = 'block'
    }
  }
}
