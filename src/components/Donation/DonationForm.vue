<template>
  <form @submit="onSubmit" class="flex flex-col w-full h-full gap-4">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem v-auto-animate>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Your email address" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="amount">
      <FormItem v-auto-animate>
        <FormLabel>Amount</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="The amount you want to donate." />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="amount in amounts" :value="amount" :key="amount">
                {{ amount }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription> The size of pet you are listing </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Enter your payment information below</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4 p-4">
        <div id="card-element"></div>
        <div id="card-errors" role="alert" class="text-destructive" v-if="error">{{ error }}</div>
      </CardContent>
    </Card>

    <Button type="submit" :disabled="loading || isPending">
      <Loader2 v-if="loading || isPending" class="animate-spin" />
      <span v-else> Donate </span>
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeCardElement,
} from '@stripe/stripe-js'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import paymentService from '@/services/payment-service'
import type { DonationDTO } from '@/types/dto/DonationDTO'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-vue-next'
import { useDark } from '@vueuse/core'

const emits = defineEmits(['success'])

const isDark = useDark()
const amounts = ['250', '500', '1000', '1500', '2000', '5000']

// Type-safe refs
const stripe = ref<Stripe | null>(null)
const card = ref<StripeCardElement | null>(null)
const loading = ref<boolean>(false)
const error = ref<string>('')

// Replace with your Stripe test publishable key
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string

const schema = toTypedSchema(
  z.object({
    amount: z.coerce.number().min(500).max(5000),
    email: z.string().email(),
  }),
)

const iconColor = computed(() => {
  return isDark.value ? '#BFC2FF' : '#565992'
})

const textColor = computed(() => {
  return isDark.value ? '#E4E1E9' : '#1B1B21'
})

const form = useForm({
  validationSchema: schema,
})

onMounted(async () => {
  try {
    const stripeInstance = await loadStripe(stripePublicKey)
    if (!stripeInstance) {
      throw new Error('Failed to load Stripe')
    }

    stripe.value = stripeInstance
    const elements: StripeElements = stripeInstance.elements()

    card.value = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: textColor.value,
          iconColor: iconColor.value,
        },
        complete: {},
      },
    })

    card.value.mount('#card-element')

    card.value.on('change', (event) => {
      if (event.error) {
        error.value = event.error.message
      } else {
        error.value = ''
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to initialize Stripe'
  }
})

const { isPending, mutateAsync } = useMutation({
  mutationKey: ['donate'],
  mutationFn: (input: DonationDTO) => paymentService.payDonation(input),
  onSuccess: () => {
    emits('success')
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  if (!stripe.value || !card.value) {
    error.value = 'Stripe not initialized'
    return
  }
  const result = await stripe.value.createToken(card.value)

  if (result.error) {
    throw new Error(result.error.message)
  }

  if (!result.token) {
    throw new Error('Token creation failed')
  }

  await mutateAsync({
    amount: values.amount,
    email: values.email,
    token: result.token.id,
  })
})
</script>
