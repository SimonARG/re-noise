<template>
  <div class="switcher-container flex-r f-al-cent">
    <span class="material-symbols-rounded">tune</span>
    <div class="audio-switcher">
      <ul class="fill-height fill-width flex-c">
        <template v-for="(audio, index) in props.audios" :key="'audio-' + index">
          <li
            @click="$emit('clicked', audio)"
            :class="['audio-list-el', 'flex-r', 'f-al-cent', { active: isActive(audio.file) }]"
          >
            <span class="material-symbols-rounded audio-icon"> {{ audio.icon }} </span>
            <span class="audio-name">{{ audio.name }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  audios: Array,
  activeAudio: [String, null]
})

// Compare active audio prop with audio in loop to highlight the active audio
const isActive = (audio) => {
  if (audio === props.activeAudio) {
    return true
  }
}
</script>

<style scoped>
.switcher-container {
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  z-index: 12;
  padding: 1rem 1rem 1rem 1rem;
  left: 0;
  top: 0;
}

.switcher-container > span {
  width: 36%;
  text-align: center;
  font-size: 4rem;
}

.audio-switcher {
  border: 1px solid white;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  background-color: rgb(20, 20, 20);
  overflow-x: hidden;
}

.audio-switcher ul {
  overflow-y: scroll;
  border-radius: 10px;
  z-index: 10;
}

.audio-switcher ul::-webkit-scrollbar {
  background-color: transparent;
  width: 0.95rem;
  border-left: 1px solid rgb(78, 78, 78);
}

.audio-switcher ul::-webkit-scrollbar-track {
  background-color: transparent;
}

.audio-switcher ul::-webkit-scrollbar-thumb {
  background-color: rgb(78, 78, 78);
  border-radius: 7px 7px 7px 7px;
  background-clip: padding-box;
  border: 3px solid transparent;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.audio-switcher ul::-webkit-scrollbar-thumb:hover {
  background-color: rgb(108, 108, 108);
}

.audio-switcher ul::-webkit-scrollbar-thumb:active {
  background-color: rgb(155, 155, 155);
}

.audio-switcher ul li {
  padding: 0.2rem 0.3rem;
}

.audio-switcher ul li.active {
  background-color: var(--switcher-list-bg);
}

.audio-switcher ul li:hover {
  background-color: var(--switcher-list-bg);
}

.audio-switcher ul li:active {
  background-color: rgb(58, 58, 58);
}

.audio-icon {
  margin-right: 0.4rem;
  font-size: 1.4rem;
}

.audio-name {
  font-size: 0.86rem;
}
</style>
