<!--
ADD TRANSACTION BUTTON COMPONENT
================================
Purpose: Floating action button for quickly adding new transactions
Features:
- Floating button positioned in bottom right
- Smooth hover animations
- Quick access to add transaction functionality
- Optional inline button variant
- Tooltip on hover

TODO - Logic needed:
1. Connect to add transaction modal or page navigation
2. Add keyboard shortcut support (Ctrl+N)
3. Implement quick add transaction popup
4. Add different transaction type options (income/expense)
5. Handle mobile responsive positioning
6. Add animation for button appearance
7. Integrate with global state for button visibility
-->

<template>
  <!-- Floating Variant -->
  <button
    v-if="variant === 'floating'"
    @click="handleAddTransaction"
    class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-50"
    :title="tooltipText"
  >
    <PlusIcon class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />

    <!-- Ripple Effect -->
    <div
      class="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"
    ></div>
  </button>

  <!-- Inline Variant -->
  <button
    v-else
    @click="handleAddTransaction"
    class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
  >
    <PlusIcon class="w-4 h-4 mr-2" />
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/24/outline'

// Define props
const props = withDefaults(
  defineProps<{
    variant?: 'floating' | 'inline'
    text?: string
    tooltip?: string
  }>(),
  {
    variant: 'floating',
    text: 'Add Transaction',
    tooltip: 'Add new transaction (Ctrl+N)',
  },
)

// Define emits
const emit = defineEmits<{
  click: []
}>()

const router = useRouter()

// Computed properties
const buttonText = computed(() => props.text)
const tooltipText = computed(() => props.tooltip)

// Methods
const handleAddTransaction = () => {
  // Emit click event for parent components to handle
  emit('click')

  // Default behavior: navigate to add transaction page
  // TODO: Replace with modal or custom logic as needed
  router.push('/transactions/add')
}

// TODO: Add these features for complete functionality:
// 1. Keyboard shortcut support (Ctrl+N)
// 2. Quick add transaction modal
// 3. Transaction type selection dropdown
// 4. Recent transaction templates
// 5. Voice input for transaction (future)
// 6. Batch transaction import
// 7. Camera integration for receipt scanning

// Keyboard shortcut support
// onMounted(() => {
//   const handleKeydown = (event: KeyboardEvent) => {
//     if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
//       event.preventDefault()
//       handleAddTransaction()
//     }
//   }
//
//   document.addEventListener('keydown', handleKeydown)
//
//   onUnmounted(() => {
//     document.removeEventListener('keydown', handleKeydown)
//   })
// })
</script>
