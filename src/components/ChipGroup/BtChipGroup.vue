<script setup>
import { ref, provide, defineProps, watch, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedChip = ref(props.modelValue);
provide('selectedChip', selectedChip);
provide('selectChip', (value) => {
  selectedChip.value = value;
});

watch(selectedChip, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <div class="chip-group">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.chip-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
