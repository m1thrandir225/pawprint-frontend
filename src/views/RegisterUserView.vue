<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="mx-auto">
      <Vueform size="lg">
        <StaticElement name="head">
          <h1 class="text-2xl font-bold">Register as an Adopter</h1>
          <p class="font-medium text-md">Are you ready to adopt your new pet?</p>
        </StaticElement>
        <GroupElement name="group">
          <TextElement
            input-type="text"
            name="firstName"
            label="First Name"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
          <TextElement
            input-type="text"
            name="lastName"
            label="Last Name"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
        </GroupElement>
        <TextElement input-type="email" name="email" label="Email" />
        <TextElement input-type="password" name="password" label="Password" />

        <SelectElement
          name="homeType"
          label="Home Type"
          :native="false"
          :items="['Flat', 'House']"
        />

        <ToggleElement name="hasChildren"> Do you have children ? </ToggleElement>
        <ToggleElement name="hasOtherPets"> Do you have other pets ? </ToggleElement>

        <ButtonElement name="button" submits> Submit </ButtonElement>
      </Vueform>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
