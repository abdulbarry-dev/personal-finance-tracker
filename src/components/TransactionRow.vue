<!--
TRANSACTION ROW COMPONENT  
=========================
Purpose: Reusable component for displaying a single transaction row
Features:
- Account info with icon and account number
- Transaction description with company/merchant name
- Category with appropriate icon and color coding
- Formatted date display
- Amount with income/expense color coding (green/red)
- Action buttons (edit, delete) on hover
- Responsive design

TODO - Logic needed:
1. Add category icon mapping for different transaction categories
2. Implement account type icon display
3. Add transaction status indicators (pending, completed, failed)
4. Handle different transaction types (transfer, payment, etc.)
5. Add tooltips for truncated text
6. Implement row selection for bulk operations
7. Add transaction detail expandable view
-->

<template>
  <div class="px-6 py-4 hover:bg-gray-50 transition-colors group">
    <div class="grid grid-cols-12 gap-4 items-center">
      <!-- Account Column -->
      <div class="col-span-3">
        <div class="flex items-center">
          <!-- Account Type Icon -->
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
            :class="getAccountIconBg(accountType)"
          >
            <component
              :is="getAccountIcon(accountType)"
              class="w-4 h-4"
              :class="getAccountIconColor(accountType)"
            />
          </div>

          <!-- Account Info -->
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ accountName }}
            </p>
            <p class="text-xs text-gray-500">
              {{ accountDisplay }}
            </p>
          </div>
        </div>
      </div>

      <!-- Transaction Column -->
      <div class="col-span-3">
        <div class="min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate" :title="transaction.description">
            {{ transaction.description }}
          </p>
          <p class="text-xs text-gray-500">
            {{ getTransactionType(transaction.type) }}
          </p>
        </div>
      </div>

      <!-- Category Column -->
      <div class="col-span-2">
        <div class="flex items-center">
          <!-- Category Icon -->
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center mr-2"
            :style="{ backgroundColor: getCategoryColor(transaction.category) + '20' }"
          >
            <component
              :is="getCategoryIcon(transaction.category)"
              class="w-3 h-3"
              :style="{ color: getCategoryColor(transaction.category) }"
            />
          </div>

          <!-- Category Name -->
          <span class="text-sm text-gray-700 truncate" :title="transaction.category">
            {{ transaction.category }}
          </span>
        </div>
      </div>

      <!-- Date Column -->
      <div class="col-span-2">
        <span class="text-sm text-gray-700">
          {{ formatDate(transaction.date) }}
        </span>
      </div>

      <!-- Amount Column -->
      <div class="col-span-2 text-right">
        <div class="flex items-center justify-end space-x-2">
          <!-- Amount -->
          <span
            class="text-sm font-medium"
            :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
          >
            {{ transaction.type === 'income' ? '+' : '-' }}${{ formatAmount(transaction.amount) }}
          </span>

          <!-- Action Buttons (shown on hover) -->
          <div
            class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1"
          >
            <button
              @click="$emit('edit', transaction)"
              class="p-1 text-gray-400 hover:text-gray-600 rounded"
              title="Edit transaction"
            >
              <PencilIcon class="w-4 h-4" />
            </button>

            <button
              @click="$emit('delete', transaction)"
              class="p-1 text-gray-400 hover:text-red-600 rounded"
              title="Delete transaction"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  BuildingLibraryIcon,
  WalletIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  TruckIcon,
  BoltIcon,
  HomeIcon,
  FilmIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import type { Transaction } from '@/services/api'

// Define props
const props = defineProps<{
  transaction: Transaction
}>()

// Define emits
defineEmits<{
  edit: [transaction: Transaction]
  delete: [transaction: Transaction]
  view: [transaction: Transaction]
}>()

// Computed properties for account info
const accountName = computed(() => {
  // TODO: Get account name from transaction.accountId via API
  // For now using sample data
  const accounts = {
    1: { name: 'US Bank', number: '0952', type: 'bank' },
    2: { name: 'Wallet', number: 'Cash', type: 'cash' },
    3: { name: 'Revolut', number: '4923', type: 'bank' },
  }
  return accounts[1]?.name || 'Unknown Account'
})

const accountDisplay = computed(() => {
  // TODO: Get account details from transaction.accountId
  const accounts = {
    1: { name: 'US Bank', number: '0952', type: 'Bank Account' },
    2: { name: 'Wallet', number: 'Cash', type: 'Cash' },
    3: { name: 'Revolut', number: '4923', type: 'Bank Account' },
  }
  const account = accounts[1]
  return account?.type === 'Cash' ? 'Cash' : `${account?.type}`
})

const accountType = computed(() => {
  // TODO: Determine account type from transaction data
  return 'bank' // 'bank', 'cash', 'credit'
})

// Helper methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const getTransactionType = (type: string) => {
  return type === 'income' ? 'Income' : 'Expense'
}

// Account icon methods
const getAccountIcon = (type: string) => {
  const icons = {
    bank: BuildingLibraryIcon,
    cash: WalletIcon,
    credit: CreditCardIcon,
  }
  return icons[type as keyof typeof icons] || BuildingLibraryIcon
}

const getAccountIconBg = (type: string) => {
  const backgrounds = {
    bank: 'bg-blue-100',
    cash: 'bg-green-100',
    credit: 'bg-purple-100',
  }
  return backgrounds[type as keyof typeof backgrounds] || 'bg-gray-100'
}

const getAccountIconColor = (type: string) => {
  const colors = {
    bank: 'text-blue-600',
    cash: 'text-green-600',
    credit: 'text-purple-600',
  }
  return colors[type as keyof typeof colors] || 'text-gray-600'
}

// Category icon and color methods
const getCategoryIcon = (category: string) => {
  // TODO: Expand category icon mapping
  const icons = {
    Groceries: ShoppingBagIcon,
    'Other Income': BriefcaseIcon,
    Gas: TruckIcon,
    Entertainment: FilmIcon,
    'Fitness & Hobbies': BoltIcon,
    Utilities: HomeIcon,
    Food: ShoppingBagIcon,
    Transport: TruckIcon,
    Healthcare: BoltIcon,
    Shopping: ShoppingBagIcon,
    Freelance: ComputerDesktopIcon,
    Salary: BriefcaseIcon,
  }
  return icons[category as keyof typeof icons] || ShoppingBagIcon
}

const getCategoryColor = (category: string) => {
  // TODO: Expand category color mapping
  const colors = {
    Groceries: '#3b82f6',
    'Other Income': '#10b981',
    Gas: '#f59e0b',
    Entertainment: '#ec4899',
    'Fitness & Hobbies': '#8b5cf6',
    Utilities: '#6b7280',
    Food: '#ef4444',
    Transport: '#3b82f6',
    Healthcare: '#10b981',
    Shopping: '#ec4899',
    Freelance: '#06b6d4',
    Salary: '#10b981',
  }
  return colors[category as keyof typeof colors] || '#6b7280'
}

// TODO: Add these features for complete functionality:
// 1. Transaction status indicators (pending, completed, failed)
// 2. Recurring transaction badges
// 3. Transaction tags/labels
// 4. Expandable row for transaction details
// 5. Checkbox for bulk selection
// 6. Drag and drop for categorization
// 7. Context menu with additional actions
</script>
