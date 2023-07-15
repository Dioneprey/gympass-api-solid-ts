import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository'
import { CheckinUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository)

  return useCase
}
