export default {
    auth: {
        SIGNUP_UNIQUENESS_ERROR: 'User with such email already exists',
        SIGNIN_ERROR: 'Invalid credentials',
    },
    general: {
        UNAUTHORIZED: 'Unauthorized: Authentication required',
        FORBIDDEN: 'You do not have access right for this',
        INTERNAL_SERVER_ERROR: 'Something went wrong',
    },
} as const
