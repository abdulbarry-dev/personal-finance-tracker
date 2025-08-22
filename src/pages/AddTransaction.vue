<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {{ isEditing ? 'Edit Transaction' : 'Add New Transaction' }}
      </h1>
      <p class="text-gray-600">
        {{
          isEditing ? 'Update transaction details' : 'Record a new income or expense transaction'
        }}
      </p>
    </div>

    <!-- Transaction Form -->
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Transaction Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Transaction Type</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input
                type="radio"
                value="expense"
                v-model="transactionType"
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-red-700">Expense</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                value="income"
                v-model="transactionType"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-green-700">Income</span>
            </label>
          </div>
        </div>

        <!-- Amount -->
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              id="amount"
              v-model="amount"
              placeholder="0.00"
              class="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <input
            type="text"
            id="description"
            v-model="description"
            placeholder="Enter transaction description..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <!-- Category and Account Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2"
              >Category</label
            >
            <select
              id="category"
              v-model="category"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <optgroup label="Expense Categories" v-if="transactionType === 'expense'">
                <option value="food">Food & Dining</option>
                <option value="transport">Transportation</option>
                <option value="shopping">Shopping</option>
                <option value="entertainment">Entertainment</option>
                <option value="bills">Bills & Utilities</option>
                <option value="healthcare">Healthcare</option>
              </optgroup>
              <optgroup label="Income Categories" v-if="transactionType === 'income'">
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="investment">Investment</option>
                <option value="business">Business</option>
                <option value="other-income">Other Income</option>
              </optgroup>
            </select>
          </div>

          <!-- Account -->
          <div>
            <label for="account" class="block text-sm font-medium text-gray-700 mb-2"
              >Account</label
            >
            <select
              id="account"
              v-model="account"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select an account</option>
              <option value="checking">Checking Account</option>
              <option value="savings">Savings Account</option>
              <option value="credit">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>

        <!-- Date -->
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            id="date"
            v-model="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <!-- Notes (Optional) -->
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-2"
            >Notes (Optional)</label
          >
          <textarea
            id="notes"
            v-model="notes"
            rows="3"
            placeholder="Add any additional notes..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="handleCancel"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-colors',
              transactionType === 'income'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white',
              loading && 'opacity-50 cursor-not-allowed',
            ]"
          >
            <span v-if="loading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isEditing ? 'Updating...' : 'Adding...' }}
            </span>
            <span v-else>
              {{ isEditing ? 'Update Transaction' : 'Add Transaction' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Props for editing
const props = defineProps<{
  id?: string
}>()

// Form data
const transactionType = ref<'income' | 'expense'>('expense')
const amount = ref('')
const description = ref('')
const category = ref('')
const account = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const notes = ref('')
const loading = ref(false)

// Computed properties
const isEditing = computed(() => !!props.id)

// Methods
const handleSubmit = async () => {
  loading.value = true

  try {
    // TODO: Implement API call to save transaction
    const transactionData = {
      type: transactionType.value,
      amount: parseFloat(amount.value),
      description: description.value,
      category: category.value,
      account: account.value,
      date: date.value,
      notes: notes.value,
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock API delay

    console.log(isEditing.value ? 'Updating transaction:' : 'Adding transaction:', transactionData)

    // Redirect to transactions list
    router.push('/transactions')
  } catch (error) {
    console.error('Error saving transaction:', error)
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/transactions')
}

// Load transaction data if editing
onMounted(() => {
  if (isEditing.value) {
    // TODO: Load transaction data from API
    console.log('Loading transaction data for ID:', props.id)
  }
})
</script>
