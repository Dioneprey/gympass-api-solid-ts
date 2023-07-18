import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import request from 'supertest'

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
