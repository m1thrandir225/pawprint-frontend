import type { Pet } from '@/types/models/pet'

const dummyPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    avatarImg:
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageShowcase: [
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    ageYears: 4,
    petType: {
      id: '1',
      name: 'dog',
    },
    petGender: {
      id: '',
      name: '',
    },
    petSize: {
      id: '3',
      name: 'large',
    },
    adoptionStatus: {
      id: '1',
      name: 'available',
    },
    healthStatus: {
      id: '1',
      name: 'healthy',
    },
    goodWithChildren: true,
    goodWithCats: false,
    goodWithDogs: true,
    energyLevel: 8,
    specialRequirements: null,
    behaviorialNotes: 'Loves fetch and is highly energetic.',
    intakeDate: '2024-11-15',
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Siamese',
    avatarImg:
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageShowcase: [
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    ageYears: 2,
    petType: {
      id: '2',
      name: 'cat',
    },
    petGender: {
      id: '',
      name: 'male',
    },
    petSize: {
      id: '1',
      name: 'small',
    },
    adoptionStatus: {
      id: '1',
      name: 'available',
    },
    healthStatus: {
      id: '2',
      name: 'needs attention',
    },
    goodWithChildren: true,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 5,
    specialRequirements: 'Requires a calm environment.',
    behaviorialNotes: 'Loves being petted and enjoys naps in the sun.',
    intakeDate: '2024-10-10',
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'Mixed',
    avatarImg:
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageShowcase: [
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    ageYears: 3,
    petType: {
      id: '1',
      name: 'dog',
    },
    petGender: {
      id: '',
      name: 'male',
    },
    petSize: {
      id: '2',
      name: 'medium',
    },
    adoptionStatus: {
      id: '2',
      name: 'pending',
    },
    healthStatus: {
      id: '1',
      name: 'healthy',
    },
    goodWithChildren: true,
    goodWithCats: true,
    goodWithDogs: true,
    energyLevel: 6,
    specialRequirements: 'Daily medication for arthritis.',
    behaviorialNotes: 'Calm and friendly.',
    intakeDate: '2024-09-20',
  },
  {
    id: '4',
    name: 'Luna',
    breed: null,
    avatarImg:
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageShowcase: [
      'https://images.unsplash.com/photo-1721327900411-b315dce4388e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    ageYears: 1,
    petType: {
      id: '2',
      name: 'cat',
    },
    petGender: {
      id: '',
      name: 'female',
    },
    petSize: {
      id: '',
      name: 'small',
    },
    adoptionStatus: {
      id: '',
      name: 'available',
    },
    healthStatus: {
      id: '',
      name: 'healthy',
    },
    goodWithChildren: false,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 7,
    specialRequirements: null,
    behaviorialNotes: 'Shy but warms up quickly.',
    intakeDate: '2024-12-01',
  },
]

export default dummyPets
