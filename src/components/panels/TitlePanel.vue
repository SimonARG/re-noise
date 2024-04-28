<template>
  <div class="title-container">
    <div class="title-panel side-panel flex-c f-al-cent">
      <h1 class="logo">Re;Noise</h1>
      <h3 class="subtitle">Make your own ambient sound</h3>
      <ul class="intro flex-c f-al-cent">
        <li>Press the top arrow to see the control panel</li>
        <li>Press the right arrow to change settings</li>
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
  min-width: fit-content;
  width: fit-content;
  min-height: 86vh;
  height: 86svh;
  border-radius: 0px 20px 20px 0px;
  padding: 1rem 1rem 1rem 3.5rem;
}

.title-panel {
  border: 1px solid white;
  height: 100%;
  padding: 0.8rem;
  border-radius: 0px 12px 12px 0px;
}

.logo {
  font-family: 'Kaushan Script', cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 3rem;
  transition: 0.4s text-shadow;
}

.subtitle {
  margin-bottom: 3rem;
  text-align: center;
}

.intro {
  list-style: none;
}

.intro li {
  font-size: 0.9rem;
  font-variation-settings: 'wdth' 87.5;
  margin-bottom: 0.4rem;
}

/*
|------------------------------------------------------------
| Media queries
|------------------------------------------------------------
*/

@media only screen and (min-width: 768px) {
  .logo {
    font-size: 4rem;
  }
  .intro li {
    text-wrap: nowrap;
  }
}
</style>
