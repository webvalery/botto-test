<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const isChecked = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  isChecked.value = newValue;
});

const toggle = () => {
  isChecked.value = !isChecked.value;
  emit('update:modelValue', isChecked.value);
};
</script>

<template>
  <div class="switcher-container">
    <div v-if="$slots['before-switch']" class="before-switch">
      <slot name="before-switch" />
    </div>

    <div class="switch" :class="{ 'checked': isChecked }" @click="toggle">
      <div class="switch-handle"></div>
    </div>

    <div v-if="$slots['after-switch']" class="after-switch">
      <slot name="after-switch" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.switcher-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.switch {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.checked {
  background-color: #4caf50;
}
.switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}
.checked .switch-handle {
  transform: translateX(20px);
}
</style>
