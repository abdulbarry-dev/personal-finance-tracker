<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-blue-100 flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-4xl font-bold text-blue-600 mb-6">Tailwind Test!</h1>
      <p class="text-gray-700 mb-4">
        This should be styled with Tailwind CSS classes.
      </p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
      <div class="mt-4 p-4 bg-green-100 border border-green-400 rounded">
        <p class="text-green-700">If you can see colors and styling, Tailwind is working!</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
