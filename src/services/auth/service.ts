import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../enums/bcrypt/enums.js'
import type { User } from '../../generated/prisma/client.js'
import prisma from '../../lib/prisma/prisma.js'
import jwt from 'jsonwebtoken'
import { AUTH_TOKEN_LIFETIME } from '../../enums/jwt/enums.js'
import type { Nullable } from '../../types/common.js'
import AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'
import type { SignInData, SignUpData } from '../../types/auth/types.js'
import {
    DEFAULT_CALENDAR_DESCRIPTION,
    DEFAULT_CALENDAR_NAME,
} from '../../enums/calendar/enums.js'

const signUp = async (data: SignUpData): Promise<string> => {
    const existingUser: Nullable<User> = await prisma.user.findUnique({
        where: { email: data.email },
    })

    if (existingUser) {
        throw new AppError(
            statusCodes.CONFLICT,
            errorMessages.auth.SIGNUP_UNIQUENESS_ERROR,
        )
    }

    const hashedPassword: string = await bcrypt.hash(data.password, SALT_ROUNDS)

    const user: User = await prisma.user.create({
        data: {
            nickname: data.nickname,
            email: data.email,
            password: hashedPassword,
            calendars: {
                create: {
                    calendar: {
                        create: {
                            name: DEFAULT_CALENDAR_NAME,
                            description: DEFAULT_CALENDAR_DESCRIPTION,
                        },
                    },
                },
            },
        },
    })

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: AUTH_TOKEN_LIFETIME,
    })
}

const signIn = async (data: SignInData): Promise<string> => {
    const user: Nullable<User> = await prisma.user.findUnique({
        where: { email: data.email },
    })

    if (!user) {
        throw new AppError(
            statusCodes.UNAUTHORIZED,
            errorMessages.auth.SIGNIN_ERROR,
        )
    }

    const isPasswordMatching: boolean = await bcrypt.compare(
        data.password,
        user.password,
    )

    if (!isPasswordMatching) {
        throw new AppError(
            statusCodes.UNAUTHORIZED,
            errorMessages.auth.SIGNIN_ERROR,
        )
    }

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: AUTH_TOKEN_LIFETIME,
    })
}

export { signUp, signIn }
