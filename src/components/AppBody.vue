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
  <div class="bg" :style="bgStyle"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { bgStore } from '../stores/bgStore.js'

import ConfigPanel from './panels/ConfigPanel.vue'
import ControlPanel from './panels/ControlPanel.vue'
import MasterPanel from './panels/MasterPanel.vue'
import TitlePanel from './panels/TitlePanel.vue'
import PanelArrow from './PanelArrow.vue'

const bgStyle = computed(() => ({
  backgroundImage: `url(${bgStore.currBg})`
}))

const masterFlipped = ref(false)
const configFlipped = ref(false)
const controlFlipped = ref(false)
const titleFlipped = ref(true)

// Function to toggle arrows
function toggleFlip(arrow) {
  switch (arrow) {
    case 'master':
      if (titleFlipped.value || controlFlipped.value || configFlipped.value) {
        setTimeout(() => {
          masterFlipped.value = !masterFlipped.value
        }, 100)
      } else {
        masterFlipped.value = !masterFlipped.value
      }
      titleFlipped.value = false
      controlFlipped.value = false
      configFlipped.value = false
      break
    case 'title':
      if (masterFlipped.value || controlFlipped.value || configFlipped.value) {
        setTimeout(() => {
          titleFlipped.value = !titleFlipped.value
        }, 100)
      } else {
        titleFlipped.value = !titleFlipped.value
      }
      masterFlipped.value = false
      controlFlipped.value = false
      configFlipped.value = false
      break
    case 'control':
      if (titleFlipped.value || masterFlipped.value || configFlipped.value) {
        setTimeout(() => {
          controlFlipped.value = !controlFlipped.value
        }, 100)
      } else {
        controlFlipped.value = !controlFlipped.value
      }
      masterFlipped.value = false
      titleFlipped.value = false
      configFlipped.value = false
      break
    case 'config':
      if (titleFlipped.value || controlFlipped.value || masterFlipped.value) {
        setTimeout(() => {
          configFlipped.value = !configFlipped.value
        }, 100)
      } else {
        configFlipped.value = !configFlipped.value
      }
      masterFlipped.value = false
      titleFlipped.value = false
      controlFlipped.value = false
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
      if (titleShow.value || controlShow.value || configShow.value) {
        setTimeout(() => {
          masterShow.value = !masterShow.value
        }, 100)
      } else {
        masterShow.value = !masterShow.value
      }
      titleShow.value = false
      controlShow.value = false
      configShow.value = false
      break
    case 'title':
      if (masterShow.value || controlShow.value || configShow.value) {
        setTimeout(() => {
          titleShow.value = !titleShow.value
        }, 100)
      } else {
        titleShow.value = !titleShow.value
      }
      masterShow.value = false
      controlShow.value = false
      configShow.value = false
      break
    case 'control':
      if (titleShow.value || masterShow.value || configShow.value) {
        setTimeout(() => {
          controlShow.value = !controlShow.value
        }, 100)
      } else {
        controlShow.value = !controlShow.value
      }
      masterShow.value = false
      titleShow.value = false
      configShow.value = false
      break
    case 'config':
      if (titleShow.value || controlShow.value || masterShow.value) {
        setTimeout(() => {
          configShow.value = !configShow.value
        }, 100)
      } else {
        configShow.value = !configShow.value
      }
      masterShow.value = false
      titleShow.value = false
      controlShow.value = false
      break
  }
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
}
</style>
