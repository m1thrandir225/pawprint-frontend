<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="flex flex-col items-start gap-4 mx-auto">
      <Vueform size="lg">
        <StaticElement name="head">
          <h3 class="text-2xl font-bold">Login</h3>
        </StaticElement>
        <TextElement input-type="email" name="email" label="Email" />
        <TextElement input-type="password" name="password" label="Password" />
        <ButtonElement name="button" submits> Submit </ButtonElement>
      </Vueform>
      <RouterLink to="/register">
        Don't have an account? <span class="font-bold">Register</span></RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>
