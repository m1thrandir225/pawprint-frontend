<script setup lang="ts">
import DefaultSubtitle from '@/components/ui/DefaultSubtitle.vue'
import DefaultParagraph from '@/components/ui/DefaultParagraph.vue'
import DefaultContainer from '@/components/ui/DefaultContainer.vue'
import { ref } from 'vue'
import DefaultRouteLink from '@/components/ui/DefaultRouteLink.vue'

const firstName = ref()
const lastName = ref()
const email = ref()
const password = ref()
const homeType = ref()
const hasChildren = ref(false)
const hasOtherPets = ref(false)

async function register(credentials: {
  firstName: string
  lastName: string
  email: string
  password: string
  homeType: string
  hasChildren: boolean
  hasOtherPets: boolean
}) {
  alert(JSON.stringify(credentials))
}
</script>

<template>
  <DefaultContainer additional-class="flex items-center justify-center min-h-dvh">
    <div class="grid w-full h-full grid-cols-2 p-8 border border-outline rounded-[16px]">
      <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full">
        <DefaultRouteLink to="/register" text="Back" class="self-start" />
        <FormKit type="form" submit-label="Login" @submit="register">
          <DefaultSubtitle text="Register as an adopter" />
          <DefaultParagraph text="Are you ready to adopt your new pet?" />
          <FormKit
            v-model="firstName"
            type="text"
            name="firstName"
            label="Your First Name"
            placeholder="James"
            help="What is your first name?"
            validation="required"
          />
          <FormKit
            v-model="lastName"
            type="text"
            name="lastName"
            label="Your Last Name"
            placeholder="Doe"
            help="What is your last name?"
            validation="required"
          />
          <FormKit
            v-model="email"
            type="text"
            name="email"
            label="Your Email"
            placeholder="james.doe@gmail.com"
            help="What is your email?"
            prefix-icon="email"
            validation="required|email"
            class=""
          />
          <FormKit
            v-model="password"
            type="password"
            name="password"
            label="Your Password"
            placeholder="se****"
            prefix-icon="password"
            validation="required|length:9|matches:/[^a-zA-Z]/"
          />

          <FormKit
            v-model="homeType"
            type="select"
            label="Home Type"
            name="homeType"
            select-icon="down"
            help="Please select the description that best matches your house."
            placeholder="Flat"
            :options="['', 'Flat', 'House']"
            validation="required"
          />

          <FormKit
            v-if="homeType"
            v-model="hasChildren"
            type="checkbox"
            label="Do you have children ? "
            name="hasChildren"
            :value="false"
            decorator-icon="check"
          />
          <FormKit
            v-if="homeType"
            v-model="hasOtherPets"
            type="checkbox"
            label="Do you have any other pets ?"
            name="hasOtherPets"
            :value="false"
            decorator-icon="check"
          />
        </FormKit>
      </div>
      <img
        class="object-cover w-full h-full max-h-[750px] rounded-[32px]"
        src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </DefaultContainer>
</template>
