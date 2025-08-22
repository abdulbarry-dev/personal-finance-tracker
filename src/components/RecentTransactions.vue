<!--
RECENT TRANSACTIONS COMPONENT
=============================
Purpose: Display a table of recent transactions with actions
Features:
- Table with columns: Account, Transaction, Category, Date, Amount
- Transaction type icons and colors
- Account information with account numbers
- Category icons and labels
- Add new transaction button
- See more action link
- Individual transaction actions (edit, delete)

TODO - Logic needed:
1. Connect to transactions API to fetch recent transactions
2. Implement transaction filtering and sorting
3. Add transaction creation modal/form
4. Handle transaction editing and deletion
5. Real-time transaction updates
6. Pagination for large transaction lists
7. Transaction search and filtering
8. Export transactions functionality
-->

<template>
  <div class="bg-white rounded-lg shadow-sm">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
            RECENT TRANSACTIONS
          </h3>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="handleAddTransaction"
            class="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
          >
            <PlusIcon class="w-4 h-4 mr-1" />
            Add new transaction
          </button>
          <button class="text-blue-600 text-sm font-medium hover:text-blue-700">See more</button>
        </div>
      </div>
    </div>

    <!-- Table Header -->
    <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div
        class="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        <div class="col-span-3">Account</div>
        <div class="col-span-3">Transaction</div>
        <div class="col-span-2">Category</div>
        <div class="col-span-2">Date</div>
        <div class="col-span-2 text-right">Amount</div>
      </div>
    </div>

    <!-- Transaction Rows -->
    <div class="divide-y divide-gray-200">
      <TransactionRow
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @edit="handleEditTransaction"
        @delete="handleDeleteTransaction"
        @view="handleViewTransaction"
      />
    </div>

    <!-- Empty State -->
    <div v-if="transactions.length === 0" class="px-6 py-12 text-center">
      <div class="text-gray-400 mb-4">
        <CreditCardIcon class="w-12 h-12 mx-auto mb-4" />
        <h4 class="text-lg font-medium text-gray-900">No transactions yet</h4>
        <p class="text-sm text-gray-500 mt-2">
          Start tracking your finances by adding your first transaction.
        </p>
      </div>
      <button
        @click="handleAddTransaction"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Transaction
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, CreditCardIcon } from '@heroicons/vue/24/outline'
import TransactionRow from './TransactionRow.vue'
import type { Transaction } from '@/services/api'

const router = useRouter()

const transactions = ref<Transaction[]>([])

// Component lifecycle
onMounted(() => {
  // TODO: Load recent transactions from API
  loadRecentTransactions()
})

// Methods
const loadRecentTransactions = async () => {
  // TODO: Implement API call to fetch recent transactions
  // try {
  //   const response = await transactionApi.getRecent(10) // Get last 10 transactions
  //   transactions.value = response.data
  // } catch (error) {
  //   console.error('Error loading recent transactions:', error)
  // }
}

const handleAddTransaction = () => {
  // TODO: Open add transaction modal or navigate to add transaction page
  router.push('/transactions/add')
}

const handleEditTransaction = (transaction: Transaction) => {
  // TODO: Open edit transaction modal or navigate to edit page
  console.log('Edit transaction:', transaction.id)
  router.push(`/transactions/edit/${transaction.id}`)
}

const handleDeleteTransaction = async (transaction: Transaction) => {
  // TODO: Implement transaction deletion with confirmation
  if (confirm(`Are you sure you want to delete this transaction?`)) {
    try {
      // await transactionApi.delete(transaction.id)
      // Remove from local array
      const index = transactions.value.findIndex((t) => t.id === transaction.id)
      if (index > -1) {
        transactions.value.splice(index, 1)
      }
      console.log('Transaction deleted:', transaction.id)
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }
}

const handleViewTransaction = (transaction: Transaction) => {
  // TODO: Navigate to transaction detail view
  router.push(`/transactions/${transaction.id}`)
}

// TODO: Add these functions for complete functionality:
// 1. refreshTransactions() - Refresh transaction list
// 2. filterTransactions(filters) - Apply date/category/amount filters
// 3. sortTransactions(field, direction) - Sort transactions
// 4. exportTransactions() - Export to CSV/Excel
// 5. handleBulkActions() - Select multiple transactions for bulk operations
// 6. searchTransactions(query) - Search transactions by description/category
// 7. loadMoreTransactions() - Pagination support
</script>
