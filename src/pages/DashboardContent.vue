<!--
DASHBOARD PAGE CONTENT
=====================
Purpose: Dashboard content that displays within the default layout
Features:
- Financial overview cards
- Charts and graphs
- Recent transactions
- Quick actions
- Loading states and error handling

This component now renders inside the DefaultLayout's <slot />
-->

<template>
  <!-- Welcome Section -->
  <div class="mb-6">
    <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
      Welcome back, {{ currentUser.firstName }}!
    </h1>
    <p class="text-gray-600">Here's your financial overview for {{ currentDateRange }}</p>
  </div>

  <!-- Error Alert -->
  <div v-if="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
    <div class="flex">
      <ExclamationTriangleIcon class="w-5 h-5 mr-2 flex-shrink-0" />
      <div>
        <strong>Error loading dashboard data:</strong> {{ error }}
        <button @click="retryLoadData" class="ml-2 underline hover:no-underline">Retry</button>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-if="isLoading" class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Loading skeletons -->
      <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow animate-pulse">
        <div class="p-6">
          <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div class="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dashboard Content -->
  <div v-else class="space-y-6">
    <!-- Top Row - Overview Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Accounts Overview -->
      <AccountsOverview
        :accounts="accounts"
        :net-worth-history="netWorthHistory"
        :selected-period="selectedPeriod"
        :is-loading="chartsLoading"
        @period-change="handlePeriodChange"
        @account-click="handleAccountClick"
      />

      <!-- Monthly Budget -->
      <MonthlyBudget
        :budget-data="budgetData"
        :current-month="currentMonth"
        :is-loading="chartsLoading"
        @budget-click="handleBudgetClick"
        @category-click="handleCategoryClick"
      />
    </div>

    <!-- Recent Transactions -->
    <RecentTransactions
      :transactions="recentTransactions"
      :accounts="accounts"
      :categories="categories"
      :is-loading="transactionsLoading"
      @transaction-edit="handleTransactionEdit"
      @transaction-delete="handleTransactionDelete"
      @view-all-click="handleViewAllTransactions"
      @add-transaction="handleAddTransaction"
    />

    <!-- Quick Actions Section -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AddTransactionButton
          variant="inline"
          text="Add Transaction"
          @click="handleAddTransaction"
        />
        <button
          @click="handleTransferMoney"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowRightIcon class="w-4 h-4 mr-2" />
          Transfer Money
        </button>
        <button
          @click="handlePayBills"
          class="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <BanknotesIcon class="w-4 h-4 mr-2" />
          Pay Bills
        </button>
        <button
          @click="handleViewReports"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ChartBarIcon class="w-4 h-4 mr-2" />
          View Reports
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ExclamationTriangleIcon,
  ArrowRightIcon,
  BanknotesIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

// Components
import AccountsOverview from '../components/AccountsOverview.vue'
import MonthlyBudget from '../components/MonthlyBudget.vue'
import RecentTransactions from '../components/RecentTransactions.vue'
import AddTransactionButton from '../components/AddTransactionButton.vue'

const router = useRouter()

// Reactive data
const isLoading = ref(true)
const chartsLoading = ref(true)
const transactionsLoading = ref(true)
const error = ref('')
const selectedPeriod = ref('6months')
const currentMonth = ref(new Date().toISOString().slice(0, 7))

// Mock data (TODO: Replace with actual API data)
const currentUser = reactive({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
})

const accounts = ref([])
const recentTransactions = ref([])
const categories = ref([])
const netWorthHistory = ref([])
const budgetData = ref({})

// Computed properties
const currentDateRange = computed(() => {
  const now = new Date()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`
})

// Methods
const loadDashboardData = async () => {
  try {
    isLoading.value = true
    error.value = ''

    // TODO: Replace with actual API calls
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data loading success
    chartsLoading.value = false
    transactionsLoading.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
  } finally {
    isLoading.value = false
  }
}

const retryLoadData = () => {
  loadDashboardData()
}

// Event handlers
const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period
  // TODO: Reload chart data with new period
}

const handleAccountClick = (accountId: string) => {
  router.push(`/accounts/${accountId}`)
}

const handleBudgetClick = () => {
  router.push('/budget')
}

const handleCategoryClick = (categoryId: string) => {
  router.push(`/categories/${categoryId}`)
}

const handleTransactionEdit = (transactionId: string) => {
  router.push(`/transactions/edit/${transactionId}`)
}

const handleTransactionDelete = (transactionId: string) => {
  // TODO: Implement delete confirmation modal
  console.log('Delete transaction:', transactionId)
}

const handleViewAllTransactions = () => {
  router.push('/transactions')
}

const handleAddTransaction = () => {
  router.push('/transactions/add')
}

const handleTransferMoney = () => {
  router.push('/transfer')
}

const handlePayBills = () => {
  router.push('/bills')
}

const handleViewReports = () => {
  router.push('/reports')
}

// Lifecycle hooks
onMounted(() => {
  loadDashboardData()
})
</script>
