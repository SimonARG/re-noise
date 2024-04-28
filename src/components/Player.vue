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

    <audio
      :volume="adjustedVolume"
      :class="'audio-' + props.loopKey"
      ref="audioRef"
      :src="audioSrc"
      loop
    ></audio>

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

    <div class="flex-c h-fit">
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
          :disabled="!status"
          v-model="volValue"
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
import { ref, watch, computed, onMounted } from 'vue'

import { statusStore } from '../stores/statusStore.js'
import { playbackStore } from '../stores/playbackStore.js'
import { volumeStore } from '../stores/volumeStore.js'
import AudioSwitcher from './AudioSwitcher.vue'

const props = defineProps({
  controlClass: String, // Dynamically asign player class depending on loop index
  audio: Object, // Get initial audio file
  audios: Array, // Get full audio array for audio switcher and display
  loopKey: Number // Get parent loop rendering index
})

// Set initial refs
const audioSrc = ref(null)
const status = ref(false) // Player on or off
const playing = ref(false) // Player playing or paused
const currAudio = ref(props.audio)

const audioPath = 'src/assets/audio/'
const fileExtension = '.opus'

// Grab <audio> element from DOM
const audioRef = ref(null)

const playPauseIcon = ref('play_arrow')
const playPauseClass = ref('playIcon')

// Check if any player is on in the status store and update accordingly
const updateAnyPlayerOn = () => {
  statusStore.isAnyPlayerOn = Object.values(statusStore.statuses).some((status) => status === true)
}

// Update "statuses" store object with player index
const togglePlayerStatus = (status) => {
  statusStore.statuses[props.loopKey] = status
  updateAnyPlayerOn()
}

const togglePlayer = () => {
  status.value = !status.value

  const audio = audioRef.value

  if (statusStore.statuses[props.loopKey] == false) {
    audioSrc.value = ''
    volumeStore.deleteIndividualVolume(props.loopKey)
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
      playbackStore.togglePlayerPlaying(playing.value, props.loopKey)
    }
    volumeStore.updateIndividualVolume(volValue.value, props.loopKey)
  }
  togglePlayerStatus(status.value)
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
    playbackStore.togglePlayerPlaying(playing.value, props.loopKey)
  } else {
    audio.pause()
    playPauseIcon.value = 'play_arrow'
    playPauseClass.value = 'playIcon'
    playing.value = false
    playbackStore.togglePlayerPlaying(playing.value, props.loopKey)
  }
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

const masterPlaying = computed(() => playbackStore.playing[props.loopKey] || false)

// Watcher that reacts to changes in this player's playing status
watch(masterPlaying, (newVal) => {
  const audio = audioRef.value
  if (newVal && audio.paused) {
    audio
      .play()
      .then(() => {
        // Handle successful playback if needed.
        playPauseIcon.value = 'pause'
        playPauseClass.value = 'pauseIcon'
        playing.value = true
      })
      .catch((error) => {
        // Handle playback error (e.g. user not interacted yet)
        console.error('Playback failed:', error)
      })
  } else if (!newVal && !audio.paused) {
    audio.pause()
    playPauseIcon.value = 'play_arrow'
    playPauseClass.value = 'playIcon'
    playing.value = false
  }
})

const volValue = ref(20)

watch(volValue, (newVolume) => {
  volumeStore.updateIndividualVolume(newVolume, props.loopKey)
})

const adjustedVolume = computed(() => {
  const maxVol = volumeStore.playerMaxVolumes[props.loopKey] || 0
  return (Math.min(maxVol, volumeStore.masterVolume) * volValue.value) / 100
})
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
  width: 3.6rem;
  height: 3.6rem;
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
  font-size: 3rem;
}

.playIcon {
  font-size: 3.5rem;
}

.on-off-btn {
  border-radius: 50%;
  background-color: transparent;
  width: 1.4rem;
  height: 1.4rem;
  transition: background-color 0.1s ease-in-out;
  margin-right: 0.3rem;
}

.on-off-btn span.inactive {
  color: red;
}

.on-off-btn span {
  font-size: 1rem;
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
  width: 7.2rem;
  height: 3.5rem;
  background-color: var(--panel-bg);
  border-radius: 10px;
  padding: 0.2rem;
}

.audio-title {
  font-size: 0.8rem;
  text-align: center;
  width: 70%;
  max-height: 100%;
  user-select: none;
  line-height: 1.15rem;
  overflow: hidden;
  text-wrap: wrap;
}

.playIcon.inactive,
.pauseIcon.inactive,
.audio-title.inactive,
.material-symbols-rounded.inactive {
  color: var(--inactive);
}

.audio-icon {
  margin-left: 0.3rem;
}

.vol-container {
  width: 100%;
  margin-top: 0.7rem;
}

.vol-slider {
  appearance: none;
  outline: none;
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  height: 0.6rem;
  cursor: pointer;
  width: 87%;
  transition: background-color 0.1s ease-in-out;
  margin-left: 0.9rem;
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
}

@media only screen and (min-width: 768px) {
  .play-btn {
    width: 5.4rem;
    height: 5.4rem;
  }
  .pauseIcon {
    font-size: 4rem;
  }

  .playIcon {
    font-size: 5.5rem;
  }
  .on-off-btn {
    width: 1.9rem;
    height: 1.9rem;
    margin-right: 0.8rem;
  }

  .on-off-btn span {
    font-size: 1.2rem;
  }

  .audio-display {
    width: 12rem;
    height: 4rem;
    padding: 0;
  }
  .audio-title {
    font-size: 0.95rem;
  }
  .audio-icon {
    margin-left: 0.6rem;
  }

  .vol-container {
    margin-top: 1.3rem;
    padding-left: 2rem;
  }

  .vol-slider {
    width: 100%;
    margin-left: 0;
  }
}

@media only screen and (min-width: 992px) {
}

@media only screen and (min-width: 1200px) {
}
</style>
