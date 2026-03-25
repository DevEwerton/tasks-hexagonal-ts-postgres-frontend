import { AuthResponseDTO, LoginDTO } from "../../shared/dtos/AuthDTO";
import { User } from "../../domain/entities/User";

export interface AuthRepository
{
	login(credentials: LoginDTO): Promise<AuthResponseDTO>;
	logout(): Promise<void>;
	saveToken(token: string): Promise<void>;
	getToken(): Promise<string | null>;
	getCurrentUser(): Promise<User | null>;
}