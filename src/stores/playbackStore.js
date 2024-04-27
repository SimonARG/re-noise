import { reactive } from 'vue'

export const playbackStore = reactive({
  playing: {},
  isAnyPlayerPlaying: false,
  updateAnyPlayerPlaying() {
    this.isAnyPlayerPlaying = Object.values(playbackStore.playing).some(
      (playing) => playing === true
    )
  },

  togglePlayerPlaying(playing, playerKey) {
    playbackStore.playing[playerKey] = playing
    this.updateAnyPlayerPlaying()
  },

  pauseAllPlayers() {
    Object.keys(this.playing).forEach((key) => {
      this.playing[key] = false
    })
    this.updateAnyPlayerPlaying()
  },

  playAllPlayers() {
    Object.keys(this.playing).forEach((key) => {
      this.playing[key] = true
    })
    this.updateAnyPlayerPlaying()
  }
})
