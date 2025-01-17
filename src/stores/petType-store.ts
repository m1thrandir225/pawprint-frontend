import type { PetType } from '@/types/models/petType'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNetworkStore } from './network-store'
import PetTypesService from '@/services/petType-service'

const usePetTypeStore = defineStore('petType', () => {
  const petTypes = ref<PetType[]>([])
  const networkStore = useNetworkStore()
  const isLoading = computed(() => networkStore.isLoading)
  const errorMessage = computed(() => networkStore.error)

  function initPetTypes(data: PetType[]) {
    petTypes.value = data
  }

  async function fetchPetTypes() {
    const request = PetTypesService.all()

    const { data, error } = await networkStore.fetchData<PetType[]>(request.url, request.options)

    if (error || !data) {
      return
    }
    console.log(data)
    initPetTypes(data)
  }

  return { petTypes, isLoading, errorMessage, fetchPetTypes }
})

export default usePetTypeStore
