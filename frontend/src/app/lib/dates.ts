export function generateCookie(value: string, expiry: Date): string {
    return `jwt=${value};expires=${expiry.toUTCString()};path=/;`;
}

export function expireCookie(value: string): string {
    const expired = new Date();
    expired.setTime(0);
    return `jwt=${value};expires=${expired.toUTCString()};path=/;`;
}
