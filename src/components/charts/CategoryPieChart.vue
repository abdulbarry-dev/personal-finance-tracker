<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center">
        <ChartPieIcon class="w-5 h-5 mr-2 text-green-600" />
        Spending Categories
      </h3>
      <button class="text-gray-500 hover:text-gray-700">
        <EllipsisHorizontalIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="h-64">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>

    <!-- Legend -->
    <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div v-for="(item, index) in categoryData" :key="item.category" class="flex items-center">
        <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: colors[index] }"></div>
        <span class="text-gray-700">{{ item.category }}</span>
        <span class="ml-auto font-medium">${{ item.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { ChartPieIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { defaultChartOptions, chartColors } from '@/plugins/chartjs'

// Sample category data
const categoryData = [
  { category: 'Food', amount: 450 },
  { category: 'Transport', amount: 280 },
  { category: 'Utilities', amount: 320 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Shopping', amount: 200 },
  { category: 'Healthcare', amount: 100 },
]

const colors = [
  chartColors.danger,
  chartColors.primary,
  chartColors.warning,
  chartColors.success,
  chartColors.purple,
  chartColors.info,
]

const chartData = computed(() => ({
  labels: categoryData.map((item) => item.category),
  datasets: [
    {
      data: categoryData.map((item) => item.amount),
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
}))

const chartOptions = computed(() => ({
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      display: false,
    },
  },
  cutout: '60%',
}))
</script>
