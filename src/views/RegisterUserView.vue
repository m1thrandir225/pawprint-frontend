<script setup lang="ts">
import DefaultSubtitle from '@/components/ui/DefaultSubtitle.vue'
import DefaultParagraph from '@/components/ui/DefaultParagraph.vue'
import DefaultContainer from '@/components/ui/DefaultContainer.vue'
import { ref } from 'vue'

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
  <DefaultContainer additional-class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full">
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
          defauklt
          :options="['', 'Flat', 'House']"
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
  </DefaultContainer>
</template>
