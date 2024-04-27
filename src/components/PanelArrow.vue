<template>
  <div :class="['arrow', position, { flip: isFlipped }]" @click="emitToggleFlip"></div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  position: String,
  isFlipped: Boolean
})

const emits = defineEmits(['toggle-flip'])

const position = ref(props.position)

function emitToggleFlip() {
  emits('toggle-flip')
}
</script>

<style scoped>
.arrow {
  background-color: var(--arrow-bg);
  cursor: pointer;
  transition:
    background-color 0.25s,
    transform 0.2s;
  z-index: 10;
  position: fixed;
  width: 3rem;
  height: 3rem;
}

.arrow:hover {
  background-color: var(--arrow-h);
}

.arrow:active {
  background-color: var(--arrow-a);
}
.arrow.left {
  clip-path: polygon(0 0, 0 100%, 60% 50%);
  margin: 0 0 0 max(1vw, 10px);
  top: 46.6%;
  transform-origin: 26% center;
}

.arrow.right {
  clip-path: polygon(40% 50%, 100% 100%, 100% 0);
  margin: 0 max(1vw, 10px) 0 0;
  top: 46.6%;
  right: 0;
  transform-origin: 74% center;
  margin-left: 1vw;
}

.arrow.top {
  clip-path: polygon(100% 0, 0 0, 50% 60%);
  margin: max(1vw, 10px) 0 0 0;
  transform-origin: center 26%;
  left: 44%;
}

.arrow.bot {
  clip-path: polygon(50% 40%, 0 100%, 100% 100%);
  margin: 0 0 max(1vw, 10px) 0;
  bottom: 0;
  transform-origin: center 74%;
  left: 44%;
}

.left.flip {
  transform: rotateY(180deg);
  transform-origin: 26% center;
}

.right.flip {
  transform: rotateY(180deg);
  transform-origin: 74% center;
}

.bot.flip {
  transform: rotateX(180deg);
  transform-origin: center 74%;
}

.top.flip {
  transform: rotateX(180deg);
  transform-origin: center 26%;
}

/*
|------------------------------------------------------------
| Media queries
|------------------------------------------------------------
*/

@media only screen and (min-width: 480px) {
  .arrow.top,
  .arrow.bot {
    left: 46%;
  }
}

@media only screen and (min-width: 768px) {
  .arrow.top,
  .arrow.bot {
    left: 47%;
  }
}

@media only screen and (min-width: 992px) {
  .arrow.top,
  .arrow.bot {
    left: 47.3%;
  }
}

@media only screen and (min-width: 1200px) {
  .arrow.top,
  .arrow.bot {
    left: 48.15%;
  }
}
</style>
