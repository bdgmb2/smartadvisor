export interface Environment {
    production: boolean;
    backendUrl: string;
    clientId: string;
    jwt?: string;
    pageError?: string;
}
