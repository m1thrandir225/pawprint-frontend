<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen gap-6">
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-4xl font-bold">Register</h1>
      <p>Please select the description that fits you most.</p>
    </div>
    <div class="container grid w-full grid-cols-2 gap-6 mx-auto">
      <RouterLink to="/register/user">
        <div
          class="w-full h-[400px] p-8 transition-all ease-in-out border border-green-600 hover:bg-green-400 rounded-2xl bg-green-200 flex flex-col items-center justify-center gap-4"
        >
          <h1 class="font-sans text-2xl font-semibold">As an Adopter</h1>
          <p class="font-sans text-lg">You are looking to introduce a new pet into your family</p>
        </div>
      </RouterLink>
      <RouterLink to="/register/shelter">
        <div
          class="w-full h-[400px] p-8 transition-all ease-in-out border border-green-600 hover:bg-green-400 rounded-2xl bg-green-200 flex flex-col items-center justify-center gap-4"
        >
          <h1 class="font-sans text-2xl font-semibold">As a Shelter</h1>
          <p class="font-sans text-lg text-center">
            You are a shelter that likes to give pets a chance to find their new home.
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
