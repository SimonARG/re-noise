import { reactive } from 'vue'

// Is there's no default wallpaper in local storage, set it
if (!localStorage.getItem('defaultBg')) {
    localStorage.setItem('defaultBg', JSON.stringify('src/assets/imgs/bg1.gif'))
}

// Is there's no bgMode in local storage, set it
if (!localStorage.getItem('bgMode')) {
    localStorage.setItem('bgMode', JSON.stringify('internal'))
}

// Is there's no wallpaper array in local storage, set it
if (!localStorage.getItem('bgArr')) {
    localStorage.setItem('bgArr', JSON.stringify([
        'src/assets/imgs/bg1.gif',
        'src/assets/imgs/bg2.jpg',
        'src/assets/imgs/bg3.gif',
        'src/assets/imgs/bg4.gif',
        'src/assets/imgs/bg5.jfif',
        'src/assets/imgs/bg6.jfif',
        'src/assets/imgs/bg7.gif',
        'src/assets/imgs/bg8.gif',
        'src/assets/imgs/bg9.jpg',
        'src/assets/imgs/bg10.jpg',
        'src/assets/imgs/bg11.gif'
    ]))
}

export const bgStore = reactive({
    currBg: JSON.parse(localStorage.getItem('currBg')) || JSON.parse(localStorage.getItem('defaultBg')), 
    bgArr: JSON.parse(localStorage.getItem("bgArr")),
    bgMode: JSON.parse(localStorage.getItem("bgMode")),

    updateBackground() {
        currBg = (currBg + bgArr.length) % bgArr.length; // Ensure index stays within bounds
        bgEl.style.background = bgArr[currBg]
        localStorage.setItem('currBg', currBg)
    }
})