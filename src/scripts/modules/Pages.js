import gsap from 'gsap'

export default class Pages {
  constructor() {
    this.index = 0
    this.selector = [...document.querySelectorAll('.slide')]

    this.setControl()
  }

  setControl() {
    document.addEventListener('keydown', (_e) => {
      _e = _e || window.event

      if (_e.key == 'ArrowLeft') {
        if (!this.index == 0) {
          this.index--
          this.setPage()
        }
      } else if (_e.key == 'ArrowRight') {
        if (this.index < this.selector.length - 1) {
          this.index++
          this.setPage()
        }
      }
    })
  }

  setPage() {
    document.querySelector('.slide--active').classList.remove('slide--active')
    this.selector[this.index].classList.add('slide--active')

    // gsap.to('.slide__container', {
    //   y: `-${this.index * 100}%`,
    //   duration: 1,
    //   ease: 'expo.inOut',
    // })

    // gsap.fromTo(
    //   '.slide--active [data-separator-word]',
    //   {
    //     y: '10%',
    //   },
    //   {
    //     y: '125%',
    //     duration: 1,
    //     ease: 'expo.in',
    //     stagger: 0.025,
    //     onComplete: () => {
    //       document.querySelector('.slide--active').classList.remove('slide--active')
    //       this.selector[this.index].classList.add('slide--active')

    //       gsap.fromTo(
    //         '.slide--active [data-separator-word]',
    //         {
    //           y: '125%',
    //         },
    //         {
    //           y: '10%',
    //           duration: 1,
    //           ease: 'expo.in',
    //           stagger: 0.025,
    //         }
    //       )
    //     },
    //   }
    // )
  }
}
