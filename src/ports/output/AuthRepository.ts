import { User } from "../../domain/entities/User";
import { LoginDTO } from "../../shared/dtos/AuthDTO";

export interface AuthRepository
{
	login(credentials: LoginDTO): Promise<User>;
	logout(): Promise<void>;
	saveToken(token: string): void;
	getToken(): string | null;
	getCurrentUser(): Promise<User | null>;
}