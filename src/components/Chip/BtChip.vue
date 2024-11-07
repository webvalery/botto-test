<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
});

const selectChip = inject('selectChip');
const selectedChip = inject('selectedChip');

const isSelected = computed(() => {
  return props.value === selectedChip.value;
});

const setSelect = () => {
  selectChip(props.value); // Вызываем функцию, чтобы установить выбранный чип
};
</script>

<template>
  <div class="bt-chip" :class="{ selected: isSelected }" @click="setSelect">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.bt-chip {
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
  user-select: none;
  border: 1px solid $color-primary;
  border-radius: 8px;
  background-color: #fff;
  color: $color-font-primary;
  transition: color .32s,background-color .3s,border-color .3s;
  &:hover {
    background-color: $color-input-bg-hover;
  }
}

.bt-chip.selected {
  background-color: $color-primary;
  color: #fff;
}
</style>
