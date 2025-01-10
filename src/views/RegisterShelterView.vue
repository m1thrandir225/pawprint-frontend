<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="mx-auto">
      <Vueform size="lg">
        <StaticElement name="head">
          <h1 class="text-2xl font-bold">Register as a shelter</h1>
          <p class="font-medium text-md">Register yourself as a licensed shelter.</p>
        </StaticElement>
        <TextElement input-type="email" name="email" label="Email" />
        <TextElement input-type="password" name="password" label="Password" />
        <GroupElement name="group">
          <TextElement
            input-type="text"
            name="address"
            label="Address"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
          <TextElement
            input-type="text"
            name="phoneNumber"
            label="Phone Number"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
        </GroupElement>

        <GroupElement name="group">
          <TextElement
            input-type="url"
            name="website"
            label="Website"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
          <TextElement
            input-type="text"
            name="capacity"
            label="Capacity"
            :columns="{
              default: 12,
              sm: 6,
            }"
          />
        </GroupElement>

        <ToggleElement name="isNoKill"> Are you a no kill shelter? </ToggleElement>
        <ButtonElement name="button" submits> Submit </ButtonElement>
      </Vueform>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
