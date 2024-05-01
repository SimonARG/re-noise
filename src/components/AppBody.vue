<template>
    <PanelArrow
      position="left"
      @click="togglePanel('title')"
      :isFlipped="titleFlipped"
      @toggle-flip="toggleFlip('title')"
    />
    <transition name="slideRight">
      <TitlePanel v-show="titleShow" />
    </transition>

    <PanelArrow
      position="top"
      @click="togglePanel('control')"
      :isFlipped="controlFlipped"
      @toggle-flip="toggleFlip('control')"
    />
    <transition name="slideDown">
      <ControlPanel v-show="controlShow" />
    </transition>

    <PanelArrow
      position="bot"
      @click="togglePanel('master')"
      :isFlipped="masterFlipped"
      @toggle-flip="toggleFlip('master')"
    />
    <transition name="slideUp">
      <MasterPanel v-show="masterShow" />
    </transition>

    <PanelArrow
      position="right"
      @click="togglePanel('config')"
      :isFlipped="configFlipped"
      @toggle-flip="toggleFlip('config')"
    />
    <transition name="slideLeft">
      <ConfigPanel v-show="configShow" />
    </transition>
    <div class="bg"></div>
</template>

<script setup>
import { ref } from 'vue'

import ConfigPanel from './panels/ConfigPanel.vue'
import ControlPanel from './panels/ControlPanel.vue'
import MasterPanel from './panels/MasterPanel.vue'
import TitlePanel from './panels/TitlePanel.vue'
import PanelArrow from './PanelArrow.vue'

const masterFlipped = ref(false)
const configFlipped = ref(false)
const controlFlipped = ref(false)
const titleFlipped = ref(true)

// Function to toggle arrows
function toggleFlip(arrow) {
  switch (arrow) {
    case 'master':
      masterFlipped.value = !masterFlipped.value
      titleFlipped.value = false
      controlFlipped.value = false
      configFlipped.value = false
      break
    case 'title':
      masterFlipped.value = false
      titleFlipped.value = !titleFlipped.value
      controlFlipped.value = false
      configFlipped.value = false
      break
    case 'control':
      masterFlipped.value = false
      titleFlipped.value = false
      controlFlipped.value = !controlFlipped.value
      configFlipped.value = false
      break
    case 'config':
      masterFlipped.value = false
      titleFlipped.value = false
      controlFlipped.value = false
      configFlipped.value = !configFlipped.value
      break
  }
}

const masterShow = ref(false)
const titleShow = ref(true)
const controlShow = ref(false)
const configShow = ref(false)

// Function to toggle panels
function togglePanel(panelName) {
  switch (panelName) {
    case 'master':
      masterShow.value = !masterShow.value
      titleShow.value = false
      controlShow.value = false
      configShow.value = false
      break
    case 'title':
      masterShow.value = false
      titleShow.value = !titleShow.value
      controlShow.value = false
      configShow.value = false
      break
    case 'control':
      masterShow.value = false
      titleShow.value = false
      controlShow.value = !controlShow.value
      configShow.value = false
      break
    case 'config':
      masterShow.value = false
      titleShow.value = false
      controlShow.value = false
      configShow.value = !configShow.value
      break
  }
}

const bgs = {
  1: '../assets/imgs/bg1.gif',
  2: '../assets/imgs/bg2.jpg',
  3: '../assets/imgs/bg3.gif',
  4: '../assets/imgs/bg4.gif',
  5: '../assets/imgs/bg5.jfif',
  6: '../assets/imgs/bg6.jfif',
  7: '../assets/imgs/bg7.gif',
  8: '../assets/imgs/bg8.gif',
  9: '../assets/imgs/bg9.jpg',
  10: '../assets/imgs/bg10.jpg',
  11: '../assets/imgs/bg11.gif'
}
</script>

<style scoped>
.slideUp-enter-from,
.slideUp-leave-to {
  transform: translateY(100%);
}

.slideUp-enter-to,
.slideUp-leave-from {
  transform: translateY(0);
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: transform 0.2s ease-in-out;
}

.slideDown-enter-from,
.slideDown-leave-to {
  transform: translateY(-100%);
}

.slideDown-enter-to,
.slideDown-leave-from {
  transform: translateY(0);
}

.slideDown-enter-active,
.slideDown-leave-active {
  transition: transform 0.2s ease-in-out;
}

.slideRight-enter-from,
.slideRight-leave-to {
  --translateX: -100%;
}

.slideRight-enter-to,
.slideRight-leave-from {
  --translateX: 0;
}

.slideRight-enter-active,
.slideRight-leave-active {
  transition: transform 0.2s ease-in-out;
}

.slideLeft-enter-from,
.slideLeft-leave-to {
  --translateX: 100%;
}

.slideLeft-enter-to,
.slideLeft-leave-from {
  --translateX: 0;
}

.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: transform 0.2s ease-in-out;
}

.bg {
  min-height: 100vh;
  height: 100svh;
  background-image: url('../assets/imgs/bg1.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
