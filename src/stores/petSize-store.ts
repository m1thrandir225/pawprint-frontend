import type { PetSize } from '@/types/models/petSize'
import { defineStore } from 'pinia'
import PetSizeService from '@/services/petSize-service'
import { useNetworkStore } from './network-store'
import { computed, ref } from 'vue'

const usePetSizeStore = defineStore('petSize', () => {
  const petSizes = ref<PetSize[]>([])
  const networkStore = useNetworkStore()
  const isLoading = computed(() => networkStore.isLoading)
  const errorMessage = computed(() => networkStore.error)

  function initPetSizes(data: PetSize[]) {
    petSizes.value = data
  }

  async function fetchPetSizes() {
    const request = PetSizeService.all()

    const { data, error } = await networkStore.fetchData<PetSize[]>(request.url, request.options)

    if (error || !data) {
      return
    }
    initPetSizes(data)
  }

  return { petSizes, isLoading, errorMessage, fetchPetSizes }
})

export default usePetSizeStore
