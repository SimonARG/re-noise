import { reactive } from 'vue'

export const volumeStore = reactive({
  masterVolume: 1.0,
  playerVolumes: {},
  playerMaxVolumes: {},

  updateMasterVolume(newVolume) {
    this.masterVolume = newVolume / 100
  },

  updateIndividualVolume(newVolume, index) {
    this.playerVolumes[index] = newVolume / 100
    this.playerMaxVolumes[index] = newVolume / 100 // Update max volume
  },

  deleteIndividualVolume(index) {
    delete this.playerVolumes[index]
  }
})
