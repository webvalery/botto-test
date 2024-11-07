<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted, onBeforeUnmount } from 'vue'

import validate from '@/utils/validationRules.js';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: null,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:modelValue']);

const sliderValue = ref(props.modelValue);
const isDragging = ref(false);
const sliderRef = ref(null);

const clampValue = (value) => Math.max(props.min, Math.min(value, props.max));
const parseNumberInput = (value) => value.replace(/\D/g, '');

const sliderPercentage = computed(() => {
  const clampedValue = Math.max(props.min, Math.min(sliderValue.value, props.max));

  return ((clampedValue - props.min) / (props.max - props.min)) * 100;
});

const updateModelValue = (value) => {
  sliderValue.value = clampValue(value);
  emit('update:modelValue', sliderValue.value);
};

watch(() => props.modelValue, (newValue) => {
  updateModelValue(newValue)
});

const onInputChange = (event) => {
  let inputValue = parseNumberInput(event.target.value);
  event.target.value = inputValue;

  const numericValue = Number(inputValue);

  if(validate.isNumber(numericValue)) {
    sliderValue.value = numericValue;
  }

  if (numericValue > props.max || numericValue < props.min) return;

  emit('update:modelValue', numericValue);
};

const onInputBlur = (event) => {
  if (event.target.value === '') {
    updateModelValue(props.min);
  } else {
    updateModelValue(Number(event.target.value));
  }
};

const calculateValue = (percentage) => {
  const valueRange = props.max - props.min;
  return clampValue(Math.round((percentage * valueRange) / props.step) * props.step + props.min);
};

const updateSliderValue = (event) => {
  const sliderRect = sliderRef.value.getBoundingClientRect();
  const offsetX = event.clientX - sliderRect.left;
  const percentage = Math.max(0, Math.min(1, offsetX / sliderRect.width));
  sliderValue.value = calculateValue(percentage);
};

const handleMouseMove = (event) => {
  if (isDragging.value) {
    updateSliderValue(event);
  }
};

const handleMouseUp = () => {
  emit('update:modelValue', sliderValue.value);
  isDragging.value = false;
};

const handleMouseDown = (event) => {
  event.preventDefault();
  isDragging.value = true;
  updateSliderValue(event);
};
</script>

<template>
  <div class="slider-input">
    <div class="input-root">
      <div class="input-container">
        <label class="input-label">
          {{ label }}
        </label>

        <input
          class="input"
          :value="sliderValue"
          @input="onInputChange"
          @blur="onInputBlur"
        />
      </div>

      <div class="presentation">
        <slot name="percentage" :percentage="sliderPercentage">
        </slot>
      </div>
    </div>

    <div class="slider-root"
      ref="sliderRef"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    >
      <span class="slider-axis-container">
        <span class="slider-axis">
          <span class="slider-axis-fill" :style="{ width: sliderPercentage + '%' }"></span>
        </span>

        <span class="slider-thumb" :style="{ left: sliderPercentage + '%' }">
          <span class="slider-thumb-inner"></span>
        </span>
      </span>

      <span class="slider-value-hints">
        <span class="slider-value-hint">
          <slot name="slider-min" :minValue="props.min">
            {{ props.min }}
          </slot>
        </span>

        <span class="slider-value-hint">
          <slot name="slider-max" :maxValue="props.max">
            {{ props.max }}
          </slot>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.slider-input {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}
.slider-root {
  position: relative;
  width: 97%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: -7px;

  &:hover,
  &:active {
    cursor: ew-resize;
  }
}
.slider-axis-container {
  width: 100%;
  position: relative;
}
.slider-axis {
  display: block;
  position: relative;
  width: 100%;
  height: 2px;
  margin: 5px 0;

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #dcdcdc;
    border-radius: 8px;
  }
}
.slider-axis-fill {
  background-color: #4caf50;
  border-radius: 3px 0 0 3px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
.slider-thumb {
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  top: -9px;
  transform: translateX(-50%);
}
.slider-thumb-inner {
  position: absolute;
  width: 13px;
  height: 13px;
  top: 8px;
  background-color: #009e36;
  border: 2px solid #fff;
  border-radius: 50%;
}
.slider-value-hints {
  display: flex;
  justify-content: stretch;
  width: 100%;
}
.slider-value-hint {
  color: $color-font-secondary;
  flex-basis: 100%;
  margin-top: 10px;
  position: relative;
  text-align: center;
  user-select: none;
  font-size: 14px;

  &:first-of-type {
      text-align: left;
  }
  &:last-of-type {
    text-align: right;
  }
  &:before {
    position: absolute;
    content: "";
    top: -8px;
    width: 2px;
    height: 6px;
    background-color: #dcdcdc;
    border-radius: 4px;
  }
  &:first-of-type:before {
    left: 3px;
  }
  &:last-of-type:before {
    right: 3px;
  }
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
  padding: 29px 0 11px 16px;
  font-family: $font-family;
  font-size: $font-size;
  font-weight: 500;
  color: $color-font-primary;
  text-overflow: ellipsis;
}
.presentation {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
}
</style>
