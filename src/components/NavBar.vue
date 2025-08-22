<!--
NAVBAR COMPONENT
================
Purpose: Top navigation bar with user profile and page title
Features:
- Dynamic page title based on current route
- User profile with avatar and name
- Dropdown menu for user actions
- Notifications badge (future)
- Search functionality (future)

TODO - Logic needed:
1. Connect to user authentication store for user data
2. Implement user dropdown menu (profile, settings, logout)
3. Add notifications system with badge count
4. Implement global search functionality
5. Handle user avatar loading and fallback
6. Add breadcrumb navigation for nested pages
-->

<template>
  <!-- Navbar Toggle Button (always visible) -->
  <button
    @click="toggleNavbar"
    class="fixed top-4 right-4 z-60 p-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-gray-800"
    :class="{ 'bg-gray-100': !$props.isHidden }"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      ></path>
    </svg>
  </button>

  <!-- Full Navbar (conditionally shown) -->
  <div
    v-show="!$props.isHidden"
    class="bg-white border-b border-gray-200 px-6 py-4 transition-all duration-300 transform"
    :class="$props.isHidden ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'"
  >
    <div class="flex items-center justify-between">
      <!-- Mobile Menu Button & Page Title -->
      <div class="flex items-center">
        <!-- Mobile Hamburger Button -->
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors mr-3"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <!-- Page Title -->
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ pageTitle }}
          </h1>
          <!-- TODO: Add breadcrumb navigation -->
          <nav class="text-sm text-gray-600 mt-1" v-if="breadcrumbs.length > 0">
            <span v-for="(crumb, index) in breadcrumbs" :key="index">
              <router-link v-if="crumb.to" :to="crumb.to" class="hover:text-gray-900">
                {{ crumb.name }}
              </router-link>
              <span v-else>{{ crumb.name }}</span>
              <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
            </span>
          </nav>
        </div>
      </div>

      <!-- Right Side - User Info & Actions -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar (Future) -->
        <!-- TODO: Implement global search -->
        <div class="hidden md:block">
          <div class="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="searchQuery"
              @input="handleSearch"
            />
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Notifications Bell (Future) -->
        <!-- TODO: Implement notifications system -->
        <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <BellIcon class="h-6 w-6" />
          <!-- Notification Badge -->
          <span
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {{ notificationCount > 9 ? '9+' : notificationCount }}
          </span>
        </button>

        <!-- User Profile Dropdown -->
        <div class="relative" ref="userDropdown">
          <button
            @click="toggleUserMenu"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <!-- User Avatar -->
            <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="w-full h-full object-cover"
                @error="handleAvatarError"
              />
              <div
                v-else
                class="w-full h-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
              >
                {{ getUserInitials(user.name) }}
              </div>
            </div>

            <!-- User Name -->
            <span class="text-sm font-medium text-gray-700">{{ user.name }}</span>

            <!-- Dropdown Arrow -->
            <ChevronDownIcon
              class="h-4 w-4 text-gray-400"
              :class="{ 'rotate-180': userMenuOpen }"
            />
          </button>

          <!-- User Dropdown Menu -->
          <div
            v-if="userMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            <router-link
              to="/profile"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserIcon class="h-4 w-4 mr-3" />
              Profile
            </router-link>

            <router-link
              to="/settings"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Cog6ToothIcon class="h-4 w-4 mr-3" />
              Settings
            </router-link>

            <hr class="my-2 border-gray-200" />

            <button
              @click="handleLogout"
              class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <ArrowRightOnRectangleIcon class="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

// Props and emits
defineProps<{
  user: any
  sidebarCollapsed?: boolean
  isHidden?: boolean
}>()

const emit = defineEmits<{
  'toggle-sidebar': []
  'toggle-navbar': []
  search: [query: string]
  'profile-click': []
  'notifications-click': []
}>()

// Reactive data
const userMenuOpen = ref(false)
const userDropdown = ref<HTMLElement>()
const searchQuery = ref('')
const notificationCount = ref(3) // TODO: Connect to notifications store

// TODO: Replace with actual user data from authentication store
const user = ref({
  name: 'Lucas Walker',
  avatar: null, // TODO: Load from user profile
  email: 'lucas.walker@example.com',
})

// Page title mapping
const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/accounts': 'Accounts',
  '/budgets': 'Budgets',
  '/transactions': 'Transactions',
  '/calculators': 'Calculators',
  '/settings': 'Settings',
  '/profile': 'Profile',
  '/reports': 'Reports',
}

const pageTitle = computed(() => {
  return pageTitles[route.path] || 'Dashboard'
})

// TODO: Implement breadcrumb system
interface Breadcrumb {
  name: string
  to?: string
}

const breadcrumbs = computed<Breadcrumb[]>(() => {
  // Return breadcrumb array based on current route
  return []
})

// Methods
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const toggleNavbar = () => {
  emit('toggle-navbar')
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleSearch = () => {
  // TODO: Implement search functionality
  console.log('Searching for:', searchQuery.value)
}

const handleAvatarError = () => {
  // TODO: Handle avatar loading error
  user.value.avatar = null
}

const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const handleLogout = () => {
  // TODO: Implement logout logic
  // 1. Clear authentication store
  // 2. Clear local storage
  // 3. Redirect to signin
  router.push('/signin')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (userDropdown.value && !userDropdown.value.contains(event.target as Node)) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// TODO: Add these features for complete functionality:
// 1. Real-time notifications system
// 2. Global search with suggestions
// 3. User preferences loading
// 4. Theme switching
// 5. Help/support integration
</script>
