<script setup>
import MortgageCalculator from './components/MortgageCalculator.vue';

const loanPurposes = [
  { label: 'Квартира на вторичном рынке', value: 24.9 },
  { label: 'Квартира в новостройке', value: 6 },
  { label: 'Купить дом', value: 6 },
  { label: 'Построить дом', value: 6 },
  { label: 'Купить землю или дачный дом', value: 25.2 },
];

const tariffs = [
  { text: 'Базовая ставка', value: 4.9 },
  { text: 'Военная ипотека', value: 0.4 },
  { text: 'Без первоначального взноса', value: 5.7 },
];

const results = [
  { label: 'Процентная ставка', value: '27%'},
  { label: 'Ежемесячный платеж', value: '825 750Р'},
  { label: 'Сумма кредита', value: '8 600 00 Р'},
]

const handleApproval = (data) => {
    console.log(data);
}
</script>

<template>
  <section class="section-block">
    <div class="container">
      <h1 class="title">Ипотечный калькулятор</h1>
      <span class="text">Тестовое задание для компании BOTTO</span>
    </div>
  </section>

  <section class="calculator">
    <div class="container">
      <mortgage-calculator
        :purposes="loanPurposes"
        :tariffs="tariffs"
        :results="results"
        @getApproval="handleApproval"
      >
        <template v-slot:after-option="{ option }">
          <span class="option-rate">{{ `От ${option.value}%` }}</span>
        </template>
      </mortgage-calculator>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.section-block {
  width: 100%;
  padding: 64px 0;
  background: #F3F6FF;
}
.container {
  max-width: 1366px;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
}
.title {
  margin-bottom: 16px;
}
.calculator {
  padding: 60px 0;
}
.option-rate {
  font-size: 14px;
  font-weight: 500;
  color: $color-font-secondary;
  user-select: none;
}
</style>
