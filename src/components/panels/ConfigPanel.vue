<template>
  <div class="config-container">
    <div class="config-panel flex-c f-al-cent">
      <h1>memes</h1>
    </div>
  </div>
</template>

<style scoped>
.config-container {
  background-color: var(--panel-bg);
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(var(--translateX, 0), -50%);
  min-width: 30vw;
  width: 30svw;
  min-height: 90vh;
  height: 90svh;
  border-radius: 20px 0px 0px 20px;
  padding: 1rem 3.5rem 1rem 1rem;
}

.config-panel {
  border: 1px solid white;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  border-radius: 12px 0px 0px 12px;
}
</style>
