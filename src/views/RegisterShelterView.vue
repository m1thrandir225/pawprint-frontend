<script setup lang="ts">
import DefaultContainer from '@/components/ui/DefaultContainer.vue'
import DefaultSubtitle from '@/components/ui/DefaultSubtitle.vue'
import DefaultParagraph from '@/components/ui/DefaultParagraph.vue'
import { ref } from 'vue'

const email = ref()
const password = ref()

const phoneNumber = ref()
const address = ref()
const website = ref()
const capacity = ref()
const isNoKill = ref(false)

async function register(credentials: {
  email: string
  password: string
  website: string
  address: string
  capacity: number
  isNoKill: boolean
  phoneNumber: string
}) {
  alert(JSON.stringify(credentials))
}
</script>

<template>
  <DefaultContainer additional-class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full">
      <FormKit type="form" submit-label="Login" @submit="register">
        <DefaultSubtitle text="Register as a shelter" />
        <DefaultParagraph text="Reigster yourself as a licensed shelter" />
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
          v-model="phoneNumber"
          type="tel"
          label="Phone number"
          placeholder="xxx-xxx-xxx"
          help="What is your shelters phone number?"
          validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
          :validation-messages="{
            matches: 'Phone number must be in the format xxx-xxx-xxxx',
          }"
          decorator-icon="telephone"
          validation-visibility="dirty"
        />
        <FormKit
          v-model="address"
          type="text"
          name="address"
          label="Your Address"
          placeholder="Sing Street 12."
          help="What is your shelter's address?"
          validation="required"
        />
        <FormKit
          v-model="website"
          type="url"
          name="website"
          label="Your Website"
          placeholder="https://shelters-australia.com.au"
          help="What is your shelters website?"
        />
        <FormKit
          v-model="capacity"
          type="number"
          name="capacity"
          label="Your Pet Capacity"
          placeholder="50"
          help="What is the capacity of your shelter?"
        />

        <FormKit
          v-model="isNoKill"
          type="checkbox"
          label="Are you a no-kill shelter? "
          name="isNoKill"
          :value="false"
          decorator-icon="check"
        />
      </FormKit>
    </div>
  </DefaultContainer>
</template>
