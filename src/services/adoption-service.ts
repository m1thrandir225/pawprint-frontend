import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { Adoption } from '@/types/models/adoption'
import type { UpdateAdoptionDTO } from '@/types/dto/UpdateAdoptionDTO'

const ADOPTION_API_URL = Config.apiURL + '/adoptions'

const adoptionService = {
  getAdoptions: () =>
    apiRequest<Adoption[]>({
      url: ADOPTION_API_URL,
      method: 'GET',
      protected: true,
    }),
  getAdoptionsForPet: (petId: string) =>
    apiRequest<Adoption[]>({
      url: `${ADOPTION_API_URL}/pet/${petId}`,
      method: 'GET',
      protected: true,
    }),
  getAdoptionsForUser: (userId: string) =>
    apiRequest<Adoption[]>({
      url: `${ADOPTION_API_URL}/user/${userId}`,
      method: 'GET',
      protected: true,
    }),
  createAdoption: (petId: string) =>
    apiRequest<Adoption>({
      url: ADOPTION_API_URL,
      method: 'POST',
      protected: true,
      data: { petId },
    }),
  updateAdoptionStatus: ({ id, approved }: { id: string; approved: number }) =>
    apiRequest<Adoption>({
      url: `${ADOPTION_API_URL}/${id}/status`,
      method: 'PUT',
      protected: true,
      data: {
        status: approved,
      },
    }),
  updateAdoption: ({
    id,
    adoptionStatusId,
    adoptionDate,
    counselorNotes,
    followUpDate,
  }: UpdateAdoptionDTO) =>
    apiRequest<Adoption>({
      url: `${ADOPTION_API_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: {
        adoptionStatusId,
        adoptionDate,
        counselorNotes,
        followUpDate,
      },
    }),
}

export default adoptionService
