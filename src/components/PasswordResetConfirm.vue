<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div class="text-center mb-8">
        <div
          class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Set New Password</h1>
        <p class="text-gray-600">Create a strong password for your account</p>
      </div>

      <form @submit.prevent="handlePasswordReset" class="space-y-6">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
          <div class="mt-2 text-xs text-gray-500">Password must be at least 8 characters long</div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <!-- Password Strength Indicator -->
        <div class="space-y-2">
          <div class="text-sm text-gray-700">Password strength:</div>
          <div class="flex space-x-1">
            <div class="h-2 flex-1 bg-gray-200 rounded"></div>
            <div class="h-2 flex-1 bg-gray-200 rounded"></div>
            <div class="h-2 flex-1 bg-gray-200 rounded"></div>
            <div class="h-2 flex-1 bg-gray-200 rounded"></div>
          </div>
          <div class="text-xs text-gray-500">Use 8+ characters with letters, numbers & symbols</div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
        >
          Reset Password
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-gray-600">
          Remember your password?
          <router-link
            to="/signin"
            class="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')

const handlePasswordReset = () => {
  // Simple validation
  if (password.value.length >= 8 && password.value === confirmPassword.value) {
    // Navigate to signin page after successful reset
    alert('Password reset successful! Redirecting to sign in...')
    router.push('/signin')
  } else if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
  } else {
    alert('Password must be at least 8 characters long!')
  }
}
</script>
