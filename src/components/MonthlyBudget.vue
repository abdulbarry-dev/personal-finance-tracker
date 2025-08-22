<!--
MONTHLY BUDGET COMPONENT
========================
Purpose: Display monthly budget overview with donut chart
Features:
- Donut chart showing income allocation (savings, expenses, left to budget)
- Monthly budget period display (Jan 01 - Jan 30, 2023)
- Budget breakdown with color-coded legend
- Manage budget action link
- Central income display in donut

TODO - Logic needed:
1. Connect to budget API to fetch current month's budget data
2. Calculate budget allocations and remaining amounts
3. Implement budget period navigation (previous/next month)
4. Add budget alerts for overspending
5. Handle budget creation if none exists
6. Real-time budget updates
7. Budget vs actual spending comparison
-->

<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">MONTHLY BUDGET</h3>
        <p class="text-xs text-gray-400 mt-1">
          {{ budgetPeriod }}
        </p>
      </div>
      <button class="text-blue-600 text-sm font-medium hover:text-blue-700">Manage budget</button>
    </div>

    <!-- Donut Chart -->
    <div class="relative mb-6">
      <div class="h-48 flex items-center justify-center">
        <div class="relative w-48 h-48">
          <Doughnut :data="chartData" :options="chartOptions" class="w-full h-full" />

          <!-- Center Income Display -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <p class="text-xs text-gray-500">Income</p>
              <p class="text-lg font-bold text-gray-900">
                ${{ formatCurrency(budgetData.income) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Budget Breakdown Legend -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
          <span class="text-sm text-gray-700">Savings</span>
        </div>
        <span class="text-sm font-medium text-gray-900">
          ${{ formatCurrency(budgetData.savings) }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
          <span class="text-sm text-gray-700">Expenses</span>
        </div>
        <span class="text-sm font-medium text-gray-900">
          ${{ formatCurrency(budgetData.expenses) }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
          <span class="text-sm text-gray-700">Left to budget</span>
        </div>
        <span class="text-sm font-medium text-gray-900">
          ${{ formatCurrency(budgetData.leftToBudget) }}
        </span>
      </div>
    </div>

    <!-- Budget Progress Bar (Optional Enhancement) -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <div class="flex justify-between text-xs text-gray-500 mb-2">
        <span>Budget Used</span>
        <span>{{ budgetUsedPercentage.toFixed(1) }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="h-2 rounded-full transition-all duration-300"
          :class="
            budgetUsedPercentage > 90
              ? 'bg-red-500'
              : budgetUsedPercentage > 70
                ? 'bg-yellow-500'
                : 'bg-green-500'
          "
          :style="{ width: `${Math.min(budgetUsedPercentage, 100)}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { defaultChartOptions, chartColors } from '@/plugins/chartjs'

// TODO: Replace with real budget data from API
const budgetData = ref({
  income: 5500,
  savings: 1000,
  expenses: 3952,
  leftToBudget: 548,
})

// Current budget period
const budgetPeriod = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`
})

// Budget used percentage
const budgetUsedPercentage = computed(() => {
  const totalBudgeted = budgetData.value.savings + budgetData.value.expenses
  return (totalBudgeted / budgetData.value.income) * 100
})

// Chart data
const chartData = computed(() => ({
  labels: ['Savings', 'Expenses', 'Left to budget'],
  datasets: [
    {
      data: [budgetData.value.savings, budgetData.value.expenses, budgetData.value.leftToBudget],
      backgroundColor: [
        chartColors.success, // Green for savings
        chartColors.danger, // Red for expenses
        '#e5e7eb', // Gray for left to budget
      ],
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverBorderWidth: 4,
    },
  ],
}))

// Chart options
const chartOptions = computed(() => ({
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      display: false, // We use custom legend
    },
    tooltip: {
      ...defaultChartOptions.plugins?.tooltip,
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.parsed
          const percentage = ((value / budgetData.value.income) * 100).toFixed(1)
          return `${label}: $${formatCurrency(value)} (${percentage}%)`
        },
      },
    },
  },
  cutout: '65%', // Creates the donut hole
  responsive: true,
  maintainAspectRatio: false,
}))

// Helper methods
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

// Component lifecycle
onMounted(() => {
  // TODO: Load budget data from API
  loadBudgetData()
})

const loadBudgetData = async () => {
  // TODO: Implement API call to fetch budget data
  // try {
  //   const response = await budgetApi.getCurrentMonthBudget()
  //   budgetData.value = response.data
  // } catch (error) {
  //   console.error('Error loading budget data:', error)
  //   // Handle no budget case - show create budget prompt
  // }
}

// TODO: Add these functions for complete functionality:
// 1. navigateBudgetPeriod(direction: 'prev' | 'next') - Navigate months
// 2. createBudget() - Create new budget if none exists
// 3. updateBudget() - Update budget allocations
// 4. getBudgetAlerts() - Check for overspending alerts
// 5. exportBudgetData() - Export budget to PDF/Excel
// 6. compareBudgetVsActual() - Show budget vs actual spending
// 7. setBudgetGoals() - Set savings and expense goals
</script>
