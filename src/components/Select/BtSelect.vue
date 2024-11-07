<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import validate from '@/utils/validationRules.js';
import { generateRandomString } from '@/utils/string.js';

import IconArrow from '../icons/IconArrow.vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: null,
  },
  defaultValue: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(['update:selected']);

const isOpen = ref(false);
const selectedOption = ref(
  validate.isNotEmptyObject(props.defaultValue) && validate.isNotEmpty(props.defaultValue.value)
    ? props.defaultValue
    : null
);
const hash = ref(generateRandomString());

if (selectedOption.value) {
  emit('update:selected', selectedOption.value);
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectedOptionLabel = computed(() => {
  return validate.isNotNull(selectedOption.value) ? selectedOption.value.label : null;
});

const iconClasses = computed(() => ({
  opened: isOpen.value,
}));

const selectOption = (option) => {
  selectedOption.value = option;
  emit('update:selected', option);
  isOpen.value = false;
};
</script>

<template>
  <div class="bt-select">
    <div class="input-root" @click="toggleDropdown">
      <div class="input-container">
        <label class="input-label">
          {{ label }}
        </label>

        <input
          class="input"
          readonly
          :value="selectedOptionLabel"
        />
      </div>

      <div
        class="input-btn-icon"
        :class="iconClasses"
      >
        <icon-arrow />
      </div>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="select-dropdown">
        <div
          v-for="option in options"
          :key="`select_alt_${hash}_${option.value}`"
          class="select-option"
          :class="{ selected: option.value === selectedOption?.value && option.label === selectedOption?.label}"
          @click="selectOption(option)"
        >
          <label class="option-label">{{ option.label }}</label>
          <slot name="after-option" :option="option"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.bt-select {
  position: relative;
  width: 100%;
}
.input-root {
  width: 100%;
  height: 56px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: $color-input-bg;
  border: 1px solid #EBEDF6;
  border-radius: 8px;
  outline: 1px solid transparent;
  transition: background-color .2s, outline .2s;

  &:hover {
    background-color: $color-input-bg-hover;
  }
  &:hover .input-btn-icon {
    color: $color-primary-hover;
  }
}
.input-container {
  width: 100%;
  height: 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.input-label {
  pointer-events: none;
  width: calc(100% - 16px);
  color: $color-font-secondary;
  overflow: hidden;
  position: absolute;
  top: 6px;
  left: 16px;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
}
.input {
  width: 100%;
  height: calc(100% - 2px);
  background-color: transparent;
  margin: 1px 0;
  border: 0;
  border-radius: 8px;
  outline: none;
  pointer-events: none;
  padding: 29px 0 11px 16px;
  font-family: $font-family;
  font-size: $font-size;
  font-weight: 500;
  color: $color-font-primary;
  text-overflow: ellipsis;
}
.input-btn-icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0 16px;
  color: $color-icon;
  transition: color .2s, transform .2s;
  cursor: pointer;
  &.opened {
    transform: rotate(180deg);
  }
}
.select-dropdown {
  width: 100%;
  max-height: 265px;
  position: absolute;
  left: 0;
  top: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .04),
              0 2px 4px 0 rgba(0, 0, 0, .04),
              0 1px 8px 0 rgba(0, 0, 0, .08);
  background-color: #fff;

  inset: 60px auto auto 0;
  transition: opacity .2s ease-in;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.select-option {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.select-option:hover,
.select-option.selected {
  background-color: #e0f7fa;
}
.option-label {
  cursor: pointer;
  user-select: none;
}
</style>
