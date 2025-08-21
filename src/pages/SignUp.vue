<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p class="text-gray-600">Join us to manage your finances</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-700 mb-2"
              >First Name</label
            >
            <input
              type="text"
              id="firstname"
              v-model="firstname"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-700 mb-2"
              >Last Name</label
            >
            <input
              type="text"
              id="lastname"
              v-model="lastname"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
        >
          Create Account
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-gray-600">
          Already have an account?
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

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSignup = () => {
  // Handle signup logic here
}
</script>
