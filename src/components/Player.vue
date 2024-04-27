<template>
  <div class="clip-overflow-y flex-r h-fir" :class="controlClass">
    <transition name="switcherTransition">
      <AudioSwitcher
        @clicked="switchAudio"
        v-show="showSwitcher"
        :audios="props.audios"
        :activeAudio="currAudio.file"
      />
    </transition>

    <audio :class="'audio-' + props.loopKey" ref="audioRef" :src="audioSrc" loop></audio>

    <div class="flex-c f-al-cent h-fit">
      <div @click="toggleSwitcher" class="switcher-arrow"></div>
      <button
        @click="playPause"
        class="btn play-btn flex-c f-al-cent f-just-cent"
        :class="{ inactive: !status }"
      >
        <span class="material-symbols-rounded" :class="[playPauseClass, { inactive: !status }]">
          {{ playPauseIcon }}
        </span>
      </button>
    </div>

    <div class="flex-c h-fit f-al-end">
      <div class="flex-r f-al-cent">
        <button @click="togglePlayer" class="btn on-off-btn flex-c f-al-cent f-just-cent">
          <span class="material-symbols-rounded" :class="{ inactive: !status }">
            power_settings_new
          </span>
        </button>

        <div class="audio-display flex-r f-al-cent f-just-cent">
          <span class="audio-title" :class="{ inactive: !status }">{{ currAudio.name }}</span>
          <span class="audio-icon material-symbols-rounded" :class="{ inactive: !status }">{{
            currAudio.icon
          }}</span>
        </div>
      </div>

      <div class="vol-container">
        <input
          v-model="vol"
          @input="changeVol"
          class="vol-slider"
          :class="{ thumbinactive: !status }"
          type="range"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { playersState } from '../helpers/eventBus.js'
import AudioSwitcher from './AudioSwitcher.vue'

const props = defineProps({
  controlClass: String,
  audio: Object,
  audios: Array,
  loopKey: Number
})

// Set initial refs
const audioSrc = ref(null)
const status = ref(false)
const playing = ref(false)
const currAudio = ref(props.audio)

const audioPath = 'src/assets/audio/'
const fileExtension = '.opus'

// Grab <audio> element from DOM
const audioRef = ref(null)

// Set default audio volume on page mount to 20%
onMounted(() => {
  const audio = audioRef.value
  audio.volume = 0.2
})

// Set default value for the volume slider
const vol = ref(20)

const playPauseIcon = ref('play_arrow')
const playPauseClass = ref('playIcon')

const togglePlayer = () => {
  status.value = !status.value

  const audio = audioRef.value

  if (audioSrc.value) {
    audioSrc.value = ''
  } else {
    if (playing.value == true) {
      audioSrc.value = audioPath + currAudio.value.file + fileExtension
      audio.load()
      audio.oncanplaythrough = () => {
        audio.play()
        audio.oncanplaythrough = null
      }
    } else if (playing.value == false) {
      audioSrc.value = audioPath + currAudio.value.file + fileExtension
      audio.load()
      audio.oncanplaythrough = () => {
        audio.pause()
        audio.oncanplaythrough = null
      }
    }
  }

  togglePlayerStatus(status.value)
}

const togglePlayerStatus = (status) => {
  playersState.statuses[props.loopKey] = status
  updateAnyPlayerOn()
}

const playPause = () => {
  if (!status.value) {
    return
  }
  const audio = audioRef.value

  if (audio.paused) {
    audio.play()
    playPauseIcon.value = 'pause'
    playPauseClass.value = 'pauseIcon'
    playing.value = true
  } else {
    audio.pause()
    playPauseIcon.value = 'play_arrow'
    playPauseClass.value = 'playIcon'
    playing.value = false
  }
}

const changeVol = () => {
  const audio = audioRef.value
  const volValue = vol.value / 100

  audio.volume = volValue
}

const showSwitcher = ref(false)

const toggleSwitcher = () => {
  showSwitcher.value = !showSwitcher.value
}

const switchAudio = (audioFile) => {
  const audio = audioRef.value
  currAudio.value = audioFile

  if (playing.value == true) {
    audioSrc.value = audioPath + audioFile.file + fileExtension
    audio.load()
    audio.oncanplaythrough = () => {
      audio.play()
      audio.oncanplaythrough = null
    }
  } else if (playing.value == false) {
    audioSrc.value = audioPath + audioFile.file + fileExtension
    audio.load()
    audio.oncanplaythrough = () => {
      audio.pause()
      audio.oncanplaythrough = null
    }
  }
}

// Utility to check if any player is on
const updateAnyPlayerOn = () => {
  playersState.isAnyPlayerOn = Object.values(playersState.statuses).some(
    (status) => status === true
  )
}
</script>

<style scoped>
.switcher-arrow {
  background-color: var(--arrow-bg);
  cursor: pointer;
  transition:
    background-color 0.25s,
    transform 0.2s;
  clip-path: polygon(100% 0, 0 0, 50% 60%);
  z-index: 20;
  transform-origin: center 26%;
  width: 2.3rem;
  height: 2.3rem;
}

.switcher-arrow:hover {
  background-color: var(--arrow-h);
}

.switcher-arrow:active {
  background-color: var(--arrow-a);
}

.switcherTransition-enter-from,
.switcherTransition-leave-to {
  transform: translateY(-100%);
}

.switcherTransition-enter-to,
.switcherTransition-leave-from {
  transform: translateY(0);
}

.switcherTransition-enter-active,
.switcherTransition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.play-btn {
  border-radius: 50%;
  background-color: transparent;
  width: 5.4rem;
  height: 5.4rem;
  transition: background-color 0.1s ease-in-out;
  clip-path: circle(50%);
}

.play-btn:hover {
  background-color: var(--panel-h);
}

.play-btn:active {
  background-color: var(--panel-a);
}

.play-btn.inactive {
  cursor: not-allowed;
}

.pauseIcon {
  font-size: 4rem;
}

.playIcon {
  font-size: 5.5rem;
}

.on-off-btn {
  border-radius: 50%;
  background-color: transparent;
  width: 1.9rem;
  height: 1.9rem;
  transition: background-color 0.1s ease-in-out;
  margin-right: 0.8rem;
}

.on-off-btn span.inactive {
  color: red;
}

.on-off-btn span {
  font-size: 1.2rem;
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.on-off-btn:hover {
  background-color: var(--panel-h);
}

.on-off-btn:active {
  background-color: var(--panel-a);
}

.material-symbols-rounded {
  font-variation-settings:
    'FILL' 1,
    'wght' 700,
    'GRAD' 0,
    'opsz' 24;
}

.audio-display {
  border: 1px solid white;
  width: 12rem;
  height: 4rem;
  background-color: var(--panel-bg);
  border-radius: 10px;
}

.audio-title {
  font-size: 0.95rem;
  text-align: center;
  width: 70%;
  max-height: 100%;
  user-select: none;
  line-height: 1.15rem;
  overflow: hidden;
  word-break: break-word;
}

.playIcon.inactive,
.pauseIcon.inactive,
.audio-title.inactive,
.material-symbols-rounded.inactive {
  color: var(--inactive);
}

.audio-icon {
  margin-left: 0.6rem;
}

.vol-container {
  width: 100%;
  margin-top: 1.3rem;
  padding-left: 2rem;
}

.vol-slider {
  appearance: none;
  outline: none;
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  height: 0.6rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.1s ease-in-out;
}

.vol-slider:hover {
  background: var(--panel-h);
}

.vol-slider:active {
  background: var(--panel-a);
}
.vol-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.32rem;
  height: 1.32rem;
  cursor: grab;
  border-radius: 50%;
  background: white;
  transition: transform 0.1s ease-in-out;
}

.vol-slider::-moz-range-thumb {
  appearance: none;
  width: 1.32rem;
  height: 1.32rem;
  cursor: grab;
  border-radius: 50%;
  background: white;
  transition: transform 0.1s ease-in-out;
}

.vol-slider.thumbinactive::-moz-slider-thumb {
  background: var(--inactive);
}
.vol-slider.thumbinactive::-webkit-slider-thumb {
  background: var(--inactive);
}

.vol-slider::-webkit-slider-thumb:hover {
  transform: scale(115%);
}

.vol-slider::-moz-range-thumb:hover {
  transform: scale(115%);
}

.vol-slider::-webkit-slider-thumb:active {
  transform: scale(107%);
  cursor: grabbing;
}
.vol-slider::-moz-range-thumb:active {
  transform: scale(107%);
  cursor: grabbing;
}
</style>
