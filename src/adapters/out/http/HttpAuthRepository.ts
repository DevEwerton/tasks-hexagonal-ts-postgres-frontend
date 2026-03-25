import { AuthRepository } from "../../../ports/output/AuthRepository";
import { LoginDTO, AuthResponseDTO } from "../../../shared/dtos/AuthDTO";
import { User } from "../../../domain/entities/User";
import axiosInstance from "./axiosInstance";
import { LocalStorageService } from "../storage/LocalStorageService";

export class HttpAuthRepository implements AuthRepository
{
	async login(credentials: LoginDTO): Promise<AuthResponseDTO>
	{
		const { data } = await axiosInstance.post<AuthResponseDTO>("/auth/login", credentials);
		return data;
	}

	async logout(): Promise<void>
	{
		await axiosInstance.post("/auth/logout");
		LocalStorageService.removeToken();
		LocalStorageService.removeUser();
	}

	async saveToken(token: string): Promise<void>
	{
		LocalStorageService.saveToken(token);
	}

	async getToken(): Promise<string | null>
	{
		return LocalStorageService.getToken();
	}

	async getCurrentUser(): Promise<User | null>
	{
		return LocalStorageService.getUser<User>();
	}
}