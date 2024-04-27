<template>
  <div class="master-container h-fit w-fit">
    <div class="master-panel h-fit w-fit flex-r f-al-cent">
      <h3 :class="{ inactive: !status }">MASTER</h3>

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
          v-model="masterValue"
          class="vol-slider"
          :class="{ thumbinactive: !status }"
          type="range"
          min="0"
          max="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import { statusStore } from '../../stores/statusStore.js'
import { playbackStore } from '../../stores/playbackStore.js'
import { volumeStore } from '../../stores/volumeStore.js'

// Fetch players status from status store
const status = computed(() => statusStore.isAnyPlayerOn)
const playing = ref(playbackStore.isAnyPlayerPlaying)

const playPauseIcon = computed(() => (playing.value ? 'pause' : 'play_arrow'))
const playPauseClass = computed(() => (playing.value ? 'pauseIcon' : 'playIcon'))

const playPause = () => {
  if (!status.value) return

  if (playing.value) {
    playbackStore.pauseAllPlayers()
  } else {
    playbackStore.playAllPlayers()
  }
}

// Additionally, it's good to keep the reactive connection directly to the store's state:
watch(
  () => playbackStore.isAnyPlayerPlaying,
  (currentPlayingState) => {
    playing.value = currentPlayingState
  }
)

const masterValue = ref(volumeStore.masterVolume * 100)

watch(masterValue, (newVolume) => {
  volumeStore.updateMasterVolume(newVolume)
  // Update individual player volumes
  for (const index in volumeStore.playerVolumes) {
    const maxVol = volumeStore.playerMaxVolumes[index] || 0
    const newPlayerVol = Math.min(maxVol, volumeStore.masterVolume) * 100
    volumeStore.playerVolumes[index] = newPlayerVol / 100
  }
})
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
  font-size: 0.9rem;
  writing-mode: vertical-lr;
  text-orientation: upright;
  letter-spacing: -5px;
  font-weight: bold;
  margin-right: 0.7rem;
}

.master-panel > h3.inactive {
  color: var(--inactive);
}

.play-btn {
  border-radius: 50%;
  background-color: transparent;
  width: 4.8rem;
  height: 4.8rem;
  transition: background-color 0.1s ease-in-out;
  clip-path: circle(50%);
  margin-right: 1rem;
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
  font-size: 3rem;
}

.playIcon {
  font-size: 4.5rem;
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
  height: 0.7rem;
  cursor: pointer;
  width: 8.7rem;
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

/*
|------------------------------------------------------------
| Media queries
|------------------------------------------------------------
*/

@media only screen and (min-width: 480px) {
  .master-panel > h3 {
    font-size: 1rem;
    margin-right: 2rem;
  }
  .play-btn {
    width: 5.8rem;
    height: 5.8rem;
    margin-right: 2rem;
  }
  .pauseIcon {
    font-size: 4rem;
  }
  .playIcon {
    font-size: 5.5rem;
  }
  .vol-slider {
    width: min(35vw, 16rem);
  }
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
}

@media only screen and (min-width: 1200px) {
}
</style>
