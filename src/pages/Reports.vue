<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
      <p class="text-gray-600">Analyze your spending patterns and financial trends</p>
    </div>

    <!-- Report Options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Expense Report -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Expense Report</h3>
            <p class="text-gray-600 text-sm">Detailed spending analysis</p>
          </div>
        </div>
        <p class="text-gray-700">
          View categorized expenses, trends, and spending patterns over time.
        </p>
      </div>

      <!-- Income Report -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Income Report</h3>
            <p class="text-gray-600 text-sm">Track your earnings</p>
          </div>
        </div>
        <p class="text-gray-700">
          Monitor income sources, growth trends, and monthly earnings patterns.
        </p>
      </div>

      <!-- Budget Report -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Budget Analysis</h3>
            <p class="text-gray-600 text-sm">Budget vs actual spending</p>
          </div>
        </div>
        <p class="text-gray-700">
          Compare planned budgets with actual spending and identify variances.
        </p>
      </div>
    </div>

    <!-- Sample Chart Area -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Monthly Spending Trend</h2>
        <div class="flex space-x-2">
          <button class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            6 Months
          </button>
          <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">1 Year</button>
          <button class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            All Time
          </button>
        </div>
      </div>

      <div
        class="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
      >
        <div class="text-center">
          <p class="text-gray-500 mb-2">Interactive charts will be displayed here</p>
          <p class="text-sm text-gray-400">
            Charts showing spending trends, category breakdowns, and budget analysis
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Implement reports functionality
// - Create interactive charts with Chart.js
// - Add date range filters
// - Implement export functionality (PDF, Excel)
// - Add comparison features (month-over-month, year-over-year)
// - Custom report builder
</script>
