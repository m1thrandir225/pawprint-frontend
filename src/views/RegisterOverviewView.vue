<template>
  <div class="flex flex-col items-center justify-center w-full h-full gap-6">
    <div class="flex flex-col items-center justify-center gap-4">
      <DefaultTitle text="Register" />
      <DefaultParagraph text="Please select the description that fits you most." />
    </div>
    <div class="container grid w-full grid-cols-2 gap-6 mx-auto">
      <RegisterCard
        to="/register/user"
        title="As an Adopter"
        description="You are looking to introduce a new pet into your family."
        card="adopter"
      />
      <RegisterCard
        to="/register/shelter"
        title="As a Shelter"
        description="You are looking to introduce a new pet into your family."
        card="shelter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultParagraph from '@/components/Global/DefaultParagraph.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import RegisterCard from '@/components/Register/RegisterCard.vue'
</script>
