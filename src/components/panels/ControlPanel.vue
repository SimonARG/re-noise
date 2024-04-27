<template>
  <div class="control-container">
    <div class="control-panel hide-overflow-y">
      <template v-for="(audio, index) in activeAudios" :key="'player-' + index">
        <Player
          :controlClass="'control-' + index"
          :audio="audio"
          :audios="audios"
          :loopKey="index"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Player from '../Player.vue'

const audios = [
  {
    file: 'Rain - Light - Ceiling',
    name: 'Light rain on ceiling',
    icon: 'rainy'
  },
  {
    file: 'Wind - Moderate - Bursty',
    name: 'Moderate bursty wind',
    icon: 'air'
  },
  {
    file: 'Thunder - Light',
    name: 'Light thunderstorm',
    icon: 'thunderstorm'
  },
  {
    file: 'Coffee Shop - Busy',
    name: 'Busy coffee shop',
    icon: 'coffee'
  },
  {
    file: 'Traffic - Moderate - Highway',
    name: 'Moderate traffic',
    icon: 'traffic'
  },
  {
    file: 'Car Ride',
    name: 'Chill car ride',
    icon: 'directions_car'
  },
  {
    file: 'Forest - Calm',
    name: 'Calm forest',
    icon: 'forest'
  },
  {
    file: 'Campfire - Medium',
    name: 'Moderate campfire',
    icon: 'local_fire_department'
  },
  {
    file: 'Beachfront - Strong',
    name: 'Strong waves',
    icon: 'waves'
  },
  {
    file: 'Beachfront - Calm',
    name: 'Calm beachfront',
    icon: 'waves'
  },
  {
    file: 'Campfire - Light',
    name: 'Soft campfire',
    icon: 'local_fire_department'
  },
  {
    file: 'Campfire - Strong',
    name: 'Strong campfire',
    icon: 'local_fire_department'
  },
  {
    file: 'Forest - Chill',
    name: 'Chill forest',
    icon: 'forest'
  },
  {
    file: 'Forest - Rainy',
    name: 'Rainforest',
    icon: 'forest'
  },
  {
    file: 'Forest - Windy',
    name: 'Windy forest',
    icon: 'forest'
  },
  {
    file: 'Rain - Heavy',
    name: 'Heavy rain',
    icon: 'rainy'
  },
  {
    file: 'Rain - Light - On Grass',
    name: 'Rain on grass',
    icon: 'rainy'
  },
  {
    file: 'Rain - Light - On Tarp',
    name: 'Rain on tarp',
    icon: 'rainy'
  },
  {
    file: 'Rain - Light',
    name: 'Light rain',
    icon: 'rainy'
  },
  {
    file: 'Rain - Moderate',
    name: 'Moderate rain',
    icon: 'rainy'
  },
  {
    file: 'Restaurant - Busy',
    name: 'Busy restaurant',
    icon: 'restaurant'
  },
  {
    file: 'Traffic - Light - Highway',
    name: 'Light traffic',
    icon: 'traffic'
  },
  {
    file: 'Train Ride',
    name: 'Train ride',
    icon: 'train'
  },
  {
    file: 'Water Flow - Light',
    name: 'Light water flow',
    icon: 'water'
  },
  {
    file: 'Water Flow - Moderate',
    name: 'Moderate water flow',
    icon: 'water'
  },
  {
    file: 'Waterfall - Strong',
    name: 'Strong waterfall',
    icon: 'waterfall_Chart'
  },
  {
    file: 'Wind - Moderate - Constant',
    name: 'Constant wind',
    icon: 'air'
  },
  {
    file: 'Wind - Strong - Bursty',
    name: 'Strong bursty wind',
    icon: 'air'
  }
]

const defaultAudios = ref([])

audios.slice(0, 9).forEach((audio) => defaultAudios.value.push(audio))

const activeAudios = ref(defaultAudios)
</script>

<style scoped>
.control-container {
  height: fit-content;
  width: fit-content;
  background-color: var(--panel-bg);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0px 0px 20px 20px;
  padding: 3.5rem 0.7rem 0.7rem 0.7rem;
  margin-left: auto;
  margin-right: auto;
}

.control-panel {
  border: 1px solid white;
  border-bottom: none;
  border-radius: 0px 0px 12px 12px;
  display: flex;
  flex-direction: column;
}

.control-0 {
  grid-area: control-0;
}

.control-1 {
  grid-area: control-1;
}

.control-2 {
  grid-area: control-2;
}

.control-3 {
  grid-area: control-3;
}

.control-4 {
  grid-area: control-4;
}

.control-5 {
  grid-area: control-5;
}

.control-6 {
  grid-area: control-6;
}

.control-7 {
  grid-area: control-7;
}

.control-8 {
  grid-area: control-8;
}

.control-5,
.control-6,
.control-7,
.control-8 {
  display: none;
}

.control-0,
.control-1,
.control-2,
.control-3,
.control-4,
.control-5,
.control-6,
.control-7,
.control-8 {
  position: relative;
  padding: 0.4rem;
  border-bottom: 1px solid white;
}

/*
|------------------------------------------------------------
| Media queries
|------------------------------------------------------------
*/

@media only screen and (min-width: 480px) {
  .control-5 {
    display: flex;
  }
  .control-panel {
    display: grid;
    grid-template-areas:
      'control-0 control-1'
      'control-2 control-3'
      'control-4 control-5';
  }
  .control-0,
  .control-2,
  .control-4 {
    border-right: 1px solid white;
  }
}

@media only screen and (min-width: 768px) {
  .control-container {
    padding: 3.5rem 1rem 1rem 1rem;
  }
  .control-panel > div {
    padding: 1rem;
  }
}

@media only screen and (min-width: 992px) {
  .control-panel {
    grid-template-areas:
      'control-0 control-1'
      'control-2 control-3'
      'control-4 control-5';
  }
  .control-0,
  .control-2,
  .control-4 {
    border-right: 1px solid white;
  }
}

@media only screen and (min-width: 1200px) {
  .control-panel {
    border: 1px solid white;
    grid-template-areas:
    'control-0 control-1 control-2'
    'control-3 control-4 control-5'
    'control-6 control-7 control-8';
  }
  .control-6,
  .control-7,
  .control-8 {
    display: flex;
  }

  .control-0,
  .control-1,
  .control-2,
  .control-3,
  .control-4,
  .control-5 {
    border-bottom: 1px solid white;
  }

  .control-0,
  .control-1,
  .control-3,
  .control-4,
  .control-6,
  .control-7 {
    border-right: 1px solid white;
  }

  .control-2,
  .control-5,
  .control-8 {
    border-right: none;
  }

  .control-6,
  .control-7,
  .control-8 {
    border-bottom: none;
  }
}
</style>
