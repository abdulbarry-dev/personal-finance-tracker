<!--
ACCOUNTS OVERVIEW COMPONENT
===========================
Purpose: Display net worth line chart with account summary
Features:
- Line chart showing net worth trend over time
- Current net worth display with percentage change
- "See more" action link
- Time period selector (1W, 1M, 3M, 1YTD, 1Y, ALL)
- Responsive design matching the image

TODO - Logic needed:
1. Connect to accounts API to fetch real account data
2. Calculate net worth from all account balances
3. Implement time period filtering for chart data
4. Add real-time data updates
5. Handle loading states and error handling
6. Add data export functionality
7. Implement account detail navigation
-->

<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">ACCOUNTS OVERVIEW</h3>
        <p class="text-xs text-gray-400 mt-1">Net Worth</p>
      </div>
      <button class="text-blue-600 text-sm font-medium hover:text-blue-700">See more</button>
    </div>

    <!-- Net Worth Display -->
    <div class="mb-6">
      <div class="flex items-baseline space-x-2">
        <span class="text-2xl font-bold text-green-600"> + ${{ formatCurrency(netWorth) }} </span>
        <span class="text-sm text-green-600 flex items-center">
          <ArrowTrendingUpIcon class="w-4 h-4 mr-1" />
          {{ netWorthChange.toFixed(2) }}%
        </span>
      </div>
    </div>

    <!-- Time Period Selector -->
    <div class="flex space-x-1 mb-6">
      <button
        v-for="period in timePeriods"
        :key="period.value"
        @click="selectedPeriod = period.value"
        class="px-3 py-1 text-xs font-medium rounded transition-colors"
        :class="
          selectedPeriod === period.value
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        "
      >
        {{ period.label }}
      </button>
    </div>

    <!-- Line Chart -->
    <div class="h-48">
      <Line :data="chartData" :options="chartOptions" class="w-full h-full" />
    </div>

    <!-- Chart Footer Info -->
    <div class="mt-4 flex justify-between text-xs text-gray-500">
      <span>{{ formatDate(chartDateRange.start) }}</span>
      <span class="font-medium">
        {{ formatDate(chartDateRange.end) }} - ${{ formatCurrency(currentValue) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { ArrowTrendingUpIcon } from '@heroicons/vue/24/outline'
import { defaultChartOptions, chartColors } from '@/plugins/chartjs'

// Time period options
const timePeriods = [
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1YTD', value: '1YTD' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' },
]

const selectedPeriod = ref('ALL')

// TODO: Replace with real data from accounts API
const netWorth = ref(24526.54)
const netWorthChange = ref(8.2) // percentage change
const currentValue = ref(21373.42)

// Sample data for chart - TODO: Replace with API data
const sampleData = [
  { date: '2023-01-01', value: 18000 },
  { date: '2023-02-01', value: 18500 },
  { date: '2023-03-01', value: 17800 },
  { date: '2023-04-01', value: 19200 },
  { date: '2023-05-01', value: 19800 },
  { date: '2023-06-01', value: 20100 },
  { date: '2023-07-01', value: 20800 },
  { date: '2023-08-01', value: 21373 },
]

// Chart data computed property
const chartData = computed(() => {
  // TODO: Filter data based on selectedPeriod
  const filteredData = getFilteredData(selectedPeriod.value)

  return {
    labels: filteredData.map((item) => formatDateForChart(item.date)),
    datasets: [
      {
        label: 'Net Worth',
        data: filteredData.map((item) => item.value),
        borderColor: chartColors.primary,
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: chartColors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  }
})

// Chart options
const chartOptions = computed(() => ({
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false, // Hide Y axis as shown in image
      beginAtZero: false,
    },
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 10,
        },
      },
    },
  },
  elements: {
    point: {
      hoverRadius: 6,
    },
  },
}))

// Chart date range
const chartDateRange = computed(() => {
  const data = getFilteredData(selectedPeriod.value)
  return {
    start: data[0]?.date || '',
    end: data[data.length - 1]?.date || '',
  }
})

// Helper methods
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatDateForChart = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getFilteredData = (period: string) => {
  // TODO: Implement proper date filtering based on period
  // For now, return sample data
  switch (period) {
    case '1W':
      return sampleData.slice(-7)
    case '1M':
      return sampleData.slice(-30)
    case '3M':
      return sampleData.slice(-90)
    case '1YTD':
      // Filter from start of year
      return sampleData
    case '1Y':
      return sampleData.slice(-365)
    default:
      return sampleData
  }
}

// Component lifecycle
onMounted(() => {
  // TODO: Load account data from API
  loadAccountsData()
})

const loadAccountsData = async () => {
  // TODO: Implement API call to fetch accounts data
  // try {
  //   const response = await accountApi.getAll()
  //   // Process and update reactive data
  // } catch (error) {
  //   console.error('Error loading accounts data:', error)
  // }
}

// TODO: Add these functions for complete functionality:
// 1. refreshData() - Refresh chart data
// 2. exportData() - Export chart data to CSV/Excel
// 3. handleDateRangeChange() - Custom date range picker
// 4. calculateNetWorthChange() - Calculate percentage change
// 5. handleAccountClick() - Navigate to account details
</script>
