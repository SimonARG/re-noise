import { reactive } from 'vue'

export const bgStore = reactive({
    currBg: parseInt(localStorage.getItem('currBg')) || 0,
    bgArr: JSON.parse(localStorage.getItem("bgArr")) || [],

    updateBackground() {
        currBg = (currBg + bgArr.length) % bgArr.length; // Ensure index stays within bounds
        bgEl.src = bgArr[currBg];
        localStorage.setItem('currBg', currBg);
    }
})
