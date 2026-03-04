export default {
    auth: {
        SIGNUP_UNIQUENESS_ERROR: 'User with such email already exists',
        SIGNIN_ERROR: 'Invalid credentials',
    },
    general: {
        UNAUTHORIZED: 'Unauthorized: Authentication required',
        FORBIDDEN: 'You do not have access right for this',
        NOT_FOUND: 'The requested resource was not found',
        INTERNAL_SERVER_ERROR: 'Something went wrong',
    },
} as const
