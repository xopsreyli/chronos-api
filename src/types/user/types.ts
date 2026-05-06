import type { User } from '../../generated/prisma/client.js'

export type UserPublic = Omit<User, 'password'>

export type NicknameUpdationData = Pick<User, 'nickname'>

export type PasswordUpdationData = Pick<User, 'password'> & {
    newPassword: string
}
