<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
        <p class="text-gray-600">Enter your email to receive a verification code</p>
      </div>

      <form @submit.prevent="handleResetRequest" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="john@example.com"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
        >
          Send Verification Code
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

    <!-- OTP Modal -->
    <OTPModal v-if="showOTPModal" @verify="handleOTPVerify" @close="showOTPModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OTPModal from '@/components/OTPModal.vue'

const router = useRouter()
const email = ref('')
const showOTPModal = ref(false)

const handleResetRequest = () => {
  // Show OTP modal after email submission
  showOTPModal.value = true
}

const handleOTPVerify = (otpCode: string) => {
  // Accept any 6-digit code for demo purposes
  // In real app, this would verify with backend
  const validCodes = ['123456', '000000', '111111']

  if (validCodes.includes(otpCode) || otpCode.length === 6) {
    // Navigate to password reset confirm page
    showOTPModal.value = false
    router.push('/password-reset-confirm')
  } else {
    // Handle invalid OTP - could show error message
    console.log('Invalid OTP code')
  }
}
</script>
