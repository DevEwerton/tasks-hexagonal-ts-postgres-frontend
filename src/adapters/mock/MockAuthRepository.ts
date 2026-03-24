import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../ports/output/AuthRepository";
import { LoginDTO } from "../../shared/dtos/AuthDTO";
import { LocalStorageService } from "../out/storage/LocalStorageService";

const mockUser: User =
{
	id: "user-mock-001",
	name: "John Doe",
	email: "john@email.com",
	createdAt: new Date("2024-01-01"),
	updatedAt: new Date("2024-01-01"),
};

export class MockAuthRepository implements AuthRepository
{
	async login(credentials: LoginDTO): Promise<User>
	{
		if (credentials.email !== "john@mail.com" || credentials.password !== "123")
		{
			throw new Error("Invalid email or password.");
		}

		LocalStorageService.saveToken("mock-token-001");
		LocalStorageService.saveUser(mockUser);

		return mockUser;
	}

	async logout(): Promise<void>
	{
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