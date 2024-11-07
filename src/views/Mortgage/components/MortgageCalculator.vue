<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

import validate from '@/utils/validationRules.js';

import BtChip from '@/components/Chip/BtChip.vue';
import BtSelect from '@/components/Select/BtSelect.vue';
import BtChipGroup from '@/components/ChipGroup/BtChipGroup.vue';
import BtSwitcher from '@/components/Switcher/BtSwitcher.vue';
import BtButton from '@/components/Button/BtButton.vue';
import BtSliderInput from '@/components/SliderInput/BtSliderInput.vue';

const props = defineProps({
  purposes: {
    type: Array,
    default: () => [],
  },
  tariffs: {
    type: Array,
    default: () => [],
  },
  results: {
    type: Array,
    default: () => [],
  }
});

const emit = defineEmits(['update:selected']);

const selectedPurposeLoan = ref(null);
const selectedTariff = ref(props.tariffs[0].value);
const isSalaryBankSber = ref(false);
const realEstateValue = ref(null);
const isMaternityCapital = ref(false);
const loanTerm = ref(null);

const handleSelect = (option) => {
  selectedPurposeLoan.value = option;
  emit('update:selected', option);
}
const handleGetApproval = (e) => {
  const data = {
    selectedPurposeLoan: selectedPurposeLoan.value,
    selectedTariff: selectedTariff.value,
    isSalaryBankSber: isSalaryBankSber.value,
    realEstateValue: realEstateValue.value,
    isMaternityCapital: isMaternityCapital.value,
    loanTerm: loanTerm.value,
  }
  emit('getApproval', data);
}
</script>

<template>
  <div class="grid">
    <div class="left">
      <div class="loan-purposes">
        <bt-select
          :options="purposes"
          :default-value="purposes[0]"
          label="Цели кредита"
          @update:selected="handleSelect"
        >
          <template v-slot:after-option="{ option }">
            <slot name="after-option" :option="option" />
          </template>
        </bt-select>
      </div>

      <div class="tariffs-group">
        <bt-chip-group v-model="selectedTariff">
          <bt-chip
            v-for="tariff in tariffs"
            :key="tariff.value"
            :value="tariff.value"
          >
            <span class="tariff-text">
              {{ tariff.text }}

              <span class="tariff-rate">
                {{`от ${tariff.value}%`}}
              </span>
            </span>
          </bt-chip>
        </bt-chip-group>
      </div>

      <div class="switcher-block">
        <span class="salary-bank-text">
          Получаю зарплату на Сбер
        </span>

        <bt-switcher v-model="isSalaryBankSber">
          <template v-slot:before-switch>
            <span class="switcher-label">-0,5%</span>
          </template>
        </bt-switcher>
      </div>

      <div class="real-estate-value">
        <bt-slider-input
          v-model="realEstateValue"
          label="Стоимость недвижимости"
          :min="1000"
          :max="10000"
          :step="100"
        >
          <template v-slot:percentage="{ percentage }">
            <span class="slider-percent">{{ `${percentage.toFixed(0)}%` }}</span>
          </template>

          <template v-slot:slider-min>
            <span>{{ `1 тыс. ₽` }}</span>
          </template>

          <template v-slot:slider-max>
            <span>{{ `10 тыс ₽` }}</span>
          </template>
        </bt-slider-input>
      </div>

      <div class="switcher-block">
        <span class="salary-bank-text">
          Использовать материнский капитал
        </span>

        <bt-switcher v-model="isMaternityCapital" />
      </div>

      <div class="loan-term">
        <bt-slider-input
          v-model="loanTerm"
          label="Срок кредита"
          :min="1"
          :max="30"
        >
          <template v-slot:slider-min>
            <span>{{ `1 год` }}</span>
          </template>

          <template v-slot:slider-max>
            <span>{{ `30 лет` }}</span>
          </template>
        </bt-slider-input>
      </div>
    </div>

    <div class="right">
      <div class="results-block">
        <ul class="results-items">
          <li
            v-for="result in results"
            :key="result.value"
            class="results-item"
          >
            <div class="result-title">{{ result.label }}</div>
            <div class="result-value">{{ result.value }}</div>
          </li>
        </ul>
      </div>
      <bt-button @click="handleGetApproval">Получить одобрение</bt-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.grid {
  display: grid;
  grid-template-columns: 1fr 392px;
  align-items: flex-start;
  gap: 52px;
}
.loan-purposes {
  margin-bottom: 24px;
}
.tariffs-group {
  margin-bottom: 24px;
}
.tariff-rate {
  font-size: 14px;
  font-weight: 500;
  color: $color-font-secondary;
}
.selected .tariff-rate {
  color: #fff;
}
.switcher-block {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.salary-bank-text {
  font-size: 14px;
  font-weight: 500;
}
.switcher-label {
  font-size: 14px;
  color: $color-font-secondary;
  margin: 0 24px 0 8px;
}
.real-estate-value {
  margin-bottom: 24px;
}
.slider-percent {
  color: #53b374;
}
.loan-term {
  margin-bottom: 24px;
}

.results-block {
  margin-bottom: 24px;
}
.results-items {
  display: grid;
  list-style: none;
  column-gap: 16px;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  padding: 0;
}
.results-item {}
.result-title {
  font-size: 14px;
  color: $color-font-secondary;
}
.result-value {
  font-size: 20px;
  font-weight: 500;
}
</style>
