<template>
  <div class="title-container">
    <div class="title-panel flex-c f-al-cent">
      <h1 class="logo">Re;Noise</h1>
      <h3 class="subtitle">your own ambient sound</h3>
      <ul class="intro flex-c">
        <li>Press the top arrow to see the control panel</li>
        <li>Press the right arrow to embed music</li>
        <li>Press the bottom arrow to see the master controls</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  background-color: var(--panel-bg);
  position: fixed;
  top: 50%;
  transform: translate(var(--translateX, 0), -50%);
  min-width: 30vw;
  width: 30svw;
  min-height: 90vh;
  height: 90svh;
  border-radius: 0px 20px 20px 0px;
  padding: 1rem 1rem 1rem 3.5rem;
}

.title-panel {
  border: 1px solid white;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  border-radius: 0px 12px 12px 0px;
}

.subtitle {
  margin-bottom: 3rem;
}

.intro {
  width: 90%;
}

.intro li {
  font-size: 0.9rem;
  font-variation-settings: 'wdth' 87.5;
  margin-bottom: 0.4rem;
}
</style>
