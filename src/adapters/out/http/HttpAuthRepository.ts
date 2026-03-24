import { User } from "../../../domain/entities/User";
import { AuthRepository } from "../../../ports/output/AuthRepository";
import { AuthResponseDTO, LoginDTO } from "../../../shared/dtos/AuthDTO";
import { LocalStorageService } from "../storage/LocalStorageService";
import axiosInstance from "./axiosInstance";

export class HttpAuthRepository implements AuthRepository
{
	async login(credentials: LoginDTO): Promise<User>
	{
		const response = await axiosInstance.post<AuthResponseDTO>("/auth/login", credentials);
		const { token, user } = response.data;

		LocalStorageService.saveToken(token);
		LocalStorageService.saveUser(user);

		return user;
	}

	async logout(): Promise<void>
	{
		await axiosInstance.post("/auth/logout");
		LocalStorageService.clear();
	}

	saveToken(token: string): void
	{
		LocalStorageService.saveToken(token);
	}

	getToken(): string | null
	{
		return LocalStorageService.getToken();
	}

	async getCurrentUser(): Promise<User | null>
	{
		return LocalStorageService.getUser<User>();
	}
}