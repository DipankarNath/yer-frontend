type AuthPayload = {
    username: string;
    password: string;
}

type AuthResponse = {
    token: string;
    refreshToken: string;
}