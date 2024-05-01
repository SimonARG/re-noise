<template>
  <div class="config-container">
    <div class="config-panel side-panel flex-c f-al-cent">
      <h2>Settings</h2>

      <div class="flex-c f-al-cent">
        <label class="bg-btn btn" for="bg-input">Change Background</label>

        <div class="flex-r f-al-cent f-just-cent">
          <button class="bg-arr bg-arr-left">
            <span class="material-symbols-rounded">arrow_left</span>
          </button>
          <input
            class="text-input"
            type="url"
            id="bg-input"
            placeholder="image url"
          />
          <button class="bg-arr bg-arr-right">
            <span class="material-symbols-rounded">arrow_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-rounded {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

.config-container {
  background-color: var(--panel-bg);
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(var(--translateX, 0), -50%);
  min-width: fit-content;
  width: fit-content;
  min-height: 86vh;
  height: 86svh;
  border-radius: 20px 0px 0px 20px;
  padding: 1rem 3.5rem 1rem 1rem;
}

.config-panel {
  border: 1px solid white;
  height: 100%;
  padding: 0.8rem;
  border-radius: 12px 0px 0px 12px;
  gap: 1.2rem;
}

label {
  margin-bottom: .4rem;
  border: none;
}

.bg-arr {
  background-color: transparent;
  outline: none;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  display: flex;
  width: 1.9rem;
  height: 1.9rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform .05s linear;
}

.bg-arr:hover {
  transform: scale(130%);
}

.bg-arr:active {
  transform: scale(120%);
}

.bg-arr span {
  font-size: 3rem;
}

.text-input {
    font-size: .9rem;
    outline: none;
    text-align: center;
    padding: .3rem .5rem;
    background-color: transparent;
    border: 1px dashed white;
    border-left: none;
    border-right: none;
    color: white;
    width: 14rem;
}

.text-input::-moz-selection {
    color: black;
    background: white;
}
  
.text-input::selection {
    color: black;
    background: white;
}

.text-input:hover,
.text-input:focus {
    background-color: var(--panel-h);
}

.text-input:active {
    background-color: var(--panel-a);
}
</style>
