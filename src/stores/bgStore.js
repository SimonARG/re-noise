import { reactive } from 'vue'

const basePath = import.meta.env.PROD ? '/' : '/'

// Is there's no default wallpaper in local storage, set it
if (!localStorage.getItem('defaultBg')) {
  localStorage.setItem('defaultBg', JSON.stringify(`${basePath}imgs/bg1.gif`))
}

// Is there's no bgMode in local storage, set it
if (!localStorage.getItem('bgMode')) {
  localStorage.setItem('bgMode', JSON.stringify('internal'))
}

const bgArray = [
  `${basePath}imgs/bg1.gif`,
  `${basePath}imgs/bg2.avif`,
  `${basePath}imgs/bg3.jpg`,
  `${basePath}imgs/bg4.gif`,
  `${basePath}imgs/bg5.avif`,
  `${basePath}imgs/bg6.avif`,
  `${basePath}imgs/bg7.avif`,
  `${basePath}imgs/bg8.avif`,
  `${basePath}imgs/bg9.avif`,
  `${basePath}imgs/bg10.avif`,
  `${basePath}imgs/bg11.avif`
]

// Is there's no wallpaper array in local storage or it's outdated, set it
if (
  !localStorage.getItem('bgArr') ||
  !JSON.parse(localStorage.getItem('bgArr')).includes(bgArray)
) {
  localStorage.setItem('bgArr', JSON.stringify(bgArray))
}

// Is there's no bgArrIndex in local storage, set it
if (!localStorage.getItem('bgArrIndex')) {
  localStorage.setItem('bgArrIndex', JSON.stringify(0))
}

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}

export const bgStore = reactive({
  currBg:
    JSON.parse(localStorage.getItem('currBg')) || JSON.parse(localStorage.getItem('defaultBg')),
  bgArr: JSON.parse(localStorage.getItem('bgArr')),
  bgArrIndex: JSON.parse(localStorage.getItem('bgArrIndex')) || 0,
  bgMode: JSON.parse(localStorage.getItem('bgMode')),
  externalBg: null,

  bgLeftArrow() {
    this.bgArrIndex = (this.bgArrIndex - 1 + this.bgArr.length) % this.bgArr.length
    this.bgArrowChange()
  },

  bgRightArrow() {
    this.bgArrIndex = (this.bgArrIndex + 1) % this.bgArr.length
    this.bgArrowChange()
  },

  bgArrowChange() {
    localStorage.setItem('bgArrIndex', JSON.stringify(this.bgArrIndex))
    this.currBg = this.bgArr[this.bgArrIndex]
    localStorage.setItem('currBg', JSON.stringify(this.currBg))
  },

  getExternalBg(url) {
    if (url && isValidUrl(url)) {
      this.externalBg = url
      this.currBg = this.externalBg
      localStorage.setItem('currBg', JSON.stringify(this.currBg))
    }
  },

  addExternalBg() {
    if (this.externalBg && isValidUrl(this.externalBg) && !this.bgArr.includes(this.externalBg)) {
      this.bgArr.push(this.externalBg)
      localStorage.setItem('bgArr', JSON.stringify(this.bgArr))
    }
  }
})
