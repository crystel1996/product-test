export interface LoginStateInterface {
    isAuthenticated: boolean;
    accessToken: string | null;
    error: string | null;
}