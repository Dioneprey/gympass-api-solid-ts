import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Yes Gym',
      description: null,
      phone: null,
      latitude: -18.8867562,
      longitude: -41.9496066,
    })

    await gymsRepository.create({
      title: 'No Gym',
      description: null,
      phone: null,
      latitude: -18.8867562,
      longitude: -41.9496066,
    })

    const { gyms } = await sut.execute({
      query: 'Yes',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Yes Gym' })])
  })

  it('should be able to search paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Yes Gym ${i}`,
        description: null,
        phone: null,
        latitude: -18.8867562,
        longitude: -41.9496066,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Yes',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Yes Gym 21' }),
      expect.objectContaining({ title: 'Yes Gym 22' }),
    ])
  })
})
