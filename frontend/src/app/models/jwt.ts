export interface LoginResponse {
    token: string;
}

export interface LocalLoginRequest {
    user: string;
    additionalClaims: { [key: string]: string; };
}
