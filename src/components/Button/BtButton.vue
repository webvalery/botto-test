<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['click']);
const handleClick = (e) => {
  e.stopPropagation();
  emit('click', e);
}
</script>

<template>
  <button class="bt-button" @click="handleClick">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/variables.scss';

.bt-button {
  width: 100%;
  height: 56px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 20px;


  border-radius: 8px;
  background-color: $color-primary;
  transition: background-color .15s,border-color .15s;

  font-size: $font-size;
  color: $color-font-primary;
  &:hover {
    background-color: $color-primary-hover;
  }
}
</style>
