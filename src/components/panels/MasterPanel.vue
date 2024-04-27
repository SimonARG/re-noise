<template>
  <div class="master-container h-fit w-fit">
    <div class="master-panel h-fit w-fit flex-r f-al-cent">
      <h3>MASTER</h3>

      <button
        @click="playPause"
        class="btn play-btn flex-c f-al-cent f-just-cent"
        :class="{ inactive: !status }"
      >
        <span class="material-symbols-rounded" :class="[playPauseClass, { inactive: !status }]">
          {{ playPauseIcon }}
        </span>
      </button>

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
import { ref, computed } from 'vue'

import { playersState } from '../../helpers/eventBus.js'

// Computed property to track if any player is "on"
const status = computed(() => playersState.isAnyPlayerOn)

const playing = ref(false)

const playPauseIcon = ref('play_arrow')
const playPauseClass = ref('playIcon')

const playPause = () => {
  if (!status.value) {
    return
  }

  if (playing) {
    playPauseIcon.value = 'pause'
    playPauseClass.value = 'pauseIcon'
  } else {
    playPauseIcon.value = 'play_arrow'
    playPauseClass.value = 'playIcon'
  }
}

const playAllPlayers = () => {
  playersState.playAll()
}

const pauseAllPlayers = () => {
  playersState.pauseAll()
}

// Set default value for the volume slider
const vol = ref(20)

const changeVol = () => {
  const audio = audioRef.value
  const volValue = vol.value / 100

  audio.volume = volValue
}
</script>

<style scoped>
.material-symbols-rounded {
  font-variation-settings:
    'FILL' 1,
    'wght' 700,
    'GRAD' 0,
    'opsz' 24;
}

.master-container {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--panel-bg);
  position: fixed;
  border-radius: 20px 20px 0px 0px;
  padding: 1rem 1rem 3.5rem 1rem;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
}

.master-panel {
  border: 1px solid white;
  padding: 0.8rem;
  border-radius: 12px 12px 0px 0px;
}

.master-panel > h3 {
  writing-mode: vertical-lr;
  text-orientation: upright;
  letter-spacing: -5px;
  font-weight: bold;
  margin-right: 2rem;
}

.play-btn {
  border-radius: 50%;
  background-color: transparent;
  width: 5.4rem;
  height: 5.4rem;
  transition: background-color 0.1s ease-in-out;
  clip-path: circle(50%);
  margin-right: 2rem;
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

.playIcon.inactive,
.pauseIcon.inactive {
  color: var(--inactive);
}

.vol-slider {
  appearance: none;
  outline: none;
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  height: 0.6rem;
  cursor: pointer;
  width: 13rem;
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
