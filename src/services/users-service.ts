import { Config } from '@/utils/config'
import type { UserDTO } from '@/types/dto/UserDTO'
import type { ShelterDTO } from '@/types/dto/ShelterDTO'
import { apiRequest } from './api-service'

const USERS_API_URL = Config.apiURL + '/users'

const usersService = {
  getAdopters: () =>
    apiRequest<UserDTO[]>({
      url: USERS_API_URL + '/adopters',
      method: 'GET',
      protected: true,
    }),
  getShelters: () =>
    apiRequest<ShelterDTO[]>({
      url: USERS_API_URL + '/shelters',
      method: 'GET',
      protected: true,
    }),
  getUserRoles: () =>
    apiRequest<string[]>({
      url: USERS_API_URL + '/roles',
      method: 'GET',
      protected: true,
    }),
  assignUserRole: ({ id, role }: { id: string; role: string }) =>
    apiRequest<boolean>({
      url: `${USERS_API_URL}/${id}/roles/${role}`,
      method: 'POST',
      protected: true,
    }),
  deleteUser: ({ id }: { id: string }) =>
    apiRequest<boolean>({
      url: `${USERS_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default usersService
