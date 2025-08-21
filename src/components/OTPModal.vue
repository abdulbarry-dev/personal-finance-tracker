<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
    <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p class="text-gray-600">Enter the 6-digit code sent to your email</p>
        <p class="text-sm text-blue-600 mt-2">Demo: Use 123456, 000000, or any 6-digit code</p>
      </div>

      <form @submit.prevent="handleVerify" class="space-y-6">
        <div class="flex justify-center space-x-2">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            type="text"
            maxlength="1"
            v-model="otpDigits[index]"
            @input="handleInput(index, $event)"
            @keydown="handleKeyDown(index, $event)"
            class="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600 mb-4">Didn't receive the code?</p>
          <button
            type="button"
            @click="handleResend"
            class="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Resend Code
          </button>
        </div>

        <div class="flex space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const emit = defineEmits(['verify', 'close'])

const otpDigits = ref(['', '', '', '', '', ''])

const handleInput = async (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (value && index < 5) {
    // Move to next input
    await nextTick()
    const nextInput = target.parentElement?.children[index + 1] as HTMLInputElement
    nextInput?.focus()
  }
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    // Move to previous input on backspace
    const target = event.target as HTMLInputElement
    const prevInput = target.parentElement?.children[index - 1] as HTMLInputElement
    prevInput?.focus()
  }
}

const handleVerify = () => {
  const otpCode = otpDigits.value.join('')
  if (otpCode.length === 6) {
    emit('verify', otpCode)
  }
}

const handleResend = () => {
  // Handle resend logic here
  otpDigits.value = ['', '', '', '', '', '']
}
</script>
