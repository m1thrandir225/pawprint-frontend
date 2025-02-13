<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default">
        <HandCoins class="w-8 h-8" />
        <span class="text-lg">Dontate</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Donate</DialogTitle>
        <DialogDescription>
          Your donation helps us continue to provide free resources to the community.
        </DialogDescription>
      </DialogHeader>
      <DonationForm v-if="currentView === 'donation'" @success="() => setCurrentView('success')" />
      <Vue3Lottie
        v-else
        :animationData="SuccessDonationLottie"
        :height="300"
        :loop="false"
        autoplay
      />
    </DialogContent>
  </Dialog>
  <div class="donation-container"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DonationForm from '../Donation/DonationForm.vue'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { HandCoins } from 'lucide-vue-next'
import { Vue3Lottie } from 'vue3-lottie'
import SuccessDonationLottie from '../../assets/donationSuccessLottie.json'

const currentView = ref<'donation' | 'success'>('donation')

const setCurrentView = (view: 'donation' | 'success') => {
  currentView.value = view
}
</script>
