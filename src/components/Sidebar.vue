<!--
SIDEBAR COMPONENT
================
Purpose: Left navigation sidebar with purple gradient background
Features:
- App logo (MYFIN with icon)
- Collapsible sidebar
- Navigation sections (MAIN, TOOLS, SETTINGS)
- Active state highlighting
- Responsive design

TODO - Logic needed:
1. Add active route detection for highlighting current page
2. Implement sidebar collapse/expand functionality
3. Connect router navigation to each menu item
4. Add user authentication check for protected routes
5. Handle mobile responsive behavior
-->

<template>
  <div
    class="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl z-50 transition-all duration-300 overflow-y-auto"
    :class="{ 'w-16': collapsed }"
  >
    <!-- Header with Logo -->
    <div class="flex items-center p-6 border-b border-indigo-800">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3"
          v-show="!collapsed"
        >
          <CurrencyDollarIcon class="w-5 h-5 text-indigo-900" />
        </div>
        <h1 class="text-xl font-bold" v-show="!collapsed">MYFIN</h1>
      </div>

      <!-- Collapse Button -->
      <button
        @click="toggleCollapse"
        class="ml-auto p-1 rounded hover:bg-indigo-800 transition-colors"
      >
        <ChevronLeftIcon class="w-5 h-5" :class="{ 'rotate-180': collapsed }" />
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6 space-y-6">
      <!-- MAIN Section -->
      <div>
        <h3
          class="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3"
          v-show="!collapsed"
        >
          MAIN
        </h3>
        <div class="space-y-2">
          <router-link
            to="/dashboard"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/dashboard')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <HomeIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Dashboard</span>
          </router-link>

          <router-link
            to="/accounts"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/accounts')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <WalletIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Accounts</span>
          </router-link>

          <router-link
            to="/budgets"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/budgets')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <ChartPieIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Budgets</span>
          </router-link>

          <router-link
            to="/transactions"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/transactions')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <ArrowsRightLeftIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Transactions</span>
          </router-link>
        </div>
      </div>

      <!-- TOOLS Section -->
      <div>
        <h3
          class="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3"
          v-show="!collapsed"
        >
          TOOLS
        </h3>
        <div class="space-y-2">
          <router-link
            to="/calculators"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/calculators')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <CalculatorIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Calculators</span>
          </router-link>
        </div>
      </div>

      <!-- SETTINGS Section -->
      <div>
        <h3
          class="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3"
          v-show="!collapsed"
        >
          SETTINGS
        </h3>
        <div class="space-y-2">
          <router-link
            to="/settings"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/settings')
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            "
          >
            <Cog6ToothIcon class="w-5 h-5" :class="{ 'mx-auto': collapsed }" />
            <span class="ml-3" v-show="!collapsed">Settings</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  CurrencyDollarIcon,
  ChevronLeftIcon,
  HomeIcon,
  WalletIcon,
  ChartPieIcon,
  ArrowsRightLeftIcon,
  CalculatorIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps<{
  isCollapsed: boolean
}>()

// Emits
const emit = defineEmits<{
  'toggle-collapse': []
}>()

const route = useRoute()

// Use prop instead of local state
const collapsed = computed(() => props.isCollapsed)

// TODO: Replace with actual authentication logic
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleCollapse = () => {
  emit('toggle-collapse')
}

// TODO: Add these functions for complete functionality:
// 1. handleLogout() - Clear user session and redirect to login
// 2. loadUserPreferences() - Load sidebar state from localStorage
// 3. saveSidebarState() - Persist collapsed state
// 4. handleMobileMenu() - Handle mobile responsive behavior
</script>
