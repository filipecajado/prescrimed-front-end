import { Observable } from "rxjs";
import { UserEntity } from "../domains/user/user";


export interface AuthServiceInterface {
    login(email: string, password: string): Promise<boolean>;
    getToken(): string | null;
    isLoggedIn(): boolean;
    logout(): void;
    getUserFromCache(): UserEntity | null;
    getUser(): Promise<boolean>;
}