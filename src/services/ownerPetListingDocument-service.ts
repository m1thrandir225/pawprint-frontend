import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { OwnerPetListingDocument } from '@/types/models/ownerPetListingDocument'

const OWNER_PET_LISTING_DOCUMENT_API_URL = Config.apiURL + '/owner-pet-listing-documents'

const ownerPetListingDocumentService = {
  getOwnerPetListingDocuments: () =>
    apiRequest<OwnerPetListingDocument[]>({
      url: OWNER_PET_LISTING_DOCUMENT_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default ownerPetListingDocumentService;
