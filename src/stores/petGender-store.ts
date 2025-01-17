import { defineStore } from 'pinia'
import { useNetworkStore } from './network-store'
import { computed, ref } from 'vue'
import type { PetGender } from '@/types/models/petGender'
import PetGenderService from '@/services/petGender-service'
const usePetGenderStore = defineStore('petGender', () => {
  const petGenders = ref<PetGender[]>([])
  const networkStore = useNetworkStore()
  const isLoading = computed(() => networkStore.isLoading)
  const errorMessage = computed(() => networkStore.error)

  function initPetGenders(data: PetGender[]) {
    petGenders.value = data
  }

  async function fetchPetGenders() {
    const request = PetGenderService.all()

    const { data, error } = await networkStore.fetchData<PetGender[]>(request.url, request.options)

    if (error || !data) {
      return
    }
    initPetGenders(data)
  }

  return { petGenders, isLoading, errorMessage, fetchPetGenders }
})

export default usePetGenderStore
