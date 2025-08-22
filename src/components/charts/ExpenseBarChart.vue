<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center">
        <ChartBarIcon class="w-5 h-5 mr-2 text-blue-600" />
        Monthly Expenses
      </h3>
      <button class="text-gray-500 hover:text-gray-700">
        <EllipsisHorizontalIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="h-64">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { ChartBarIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { defaultChartOptions, chartColors } from '@/plugins/chartjs'

// Sample expense data
const expenseData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 950 },
  { month: 'Mar', amount: 1100 },
  { month: 'Apr', amount: 1350 },
  { month: 'May', amount: 980 },
  { month: 'Jun', amount: 1250 },
]

const chartData = computed(() => ({
  labels: expenseData.map((item) => item.month),
  datasets: [
    {
      label: 'Expenses ($)',
      data: expenseData.map((item) => item.amount),
      backgroundColor: chartColors.primary,
      borderColor: chartColors.primary,
      borderWidth: 2,
      borderRadius: 4,
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
}))
</script>
