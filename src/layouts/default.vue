<!--
DEFAULT LAYOUT
==============
Purpose: Main layout wrapper for authenticated pages
Features:
- Persistent sidebar and navbar
- Slot for page content
- Mobile responsive with overlay
- Loading states
- Error handling

This layout wraps all authenticated pages to provide consistent navigation
-->

<template>
  <div class="h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar - Fixed Position -->
    <Sidebar
      :is-collapsed="isSidebarCollapsed"
      @toggle-collapse="toggleSidebar"
      class="fixed inset-y-0 left-0 z-50"
    />

    <!-- Main Content Area - Offset by sidebar width -->
    <div
      class="flex flex-col h-full transition-all duration-300"
      :class="{
        'ml-64': !isSidebarCollapsed,
        'ml-16': isSidebarCollapsed,
      }"
    >
      <!-- Top Navigation - Fixed at top -->
      <NavBar
        :user="currentUser"
        :sidebar-collapsed="isSidebarCollapsed"
        @toggle-sidebar="toggleSidebar"
        @search="handleSearch"
        @profile-click="handleProfileClick"
        @notifications-click="handleNotificationsClick"
        class="flex-shrink-0"
      />

      <!-- Page Content - Scrollable Area -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 lg:p-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Floating Add Button - Fixed Position -->
    <AddTransactionButton
      variant="floating"
      @click="handleAddTransaction"
      class="fixed bottom-6 right-6 z-40"
    />

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="showMobileOverlay"
      @click="toggleSidebar"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Components
import Sidebar from '../components/Sidebar.vue'
import NavBar from '../components/NavBar.vue'
import AddTransactionButton from '../components/AddTransactionButton.vue'

const router = useRouter()

// Reactive data
const isSidebarCollapsed = ref(false)

// Mock user data (TODO: Replace with actual store data)
const currentUser = reactive({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
})

// Computed properties
const showMobileOverlay = computed(() => {
  return !isSidebarCollapsed.value && window.innerWidth < 1024
})

// Methods
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// Event handlers
const handleSearch = (query: string) => {
  console.log('Search:', query)
  router.push(`/search?q=${encodeURIComponent(query)}`)
}

const handleProfileClick = () => {
  router.push('/profile')
}

const handleNotificationsClick = () => {
  router.push('/notifications')
}

const handleAddTransaction = () => {
  router.push('/transactions/add')
}

// Store sidebar state in localStorage
onMounted(() => {
  const savedState = localStorage.getItem('sidebarCollapsed')
  if (savedState !== null) {
    isSidebarCollapsed.value = JSON.parse(savedState)
  }
})

// Watch for sidebar changes and save to localStorage
import { watch } from 'vue'
watch(isSidebarCollapsed, (newValue) => {
  localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue))
})
</script>
