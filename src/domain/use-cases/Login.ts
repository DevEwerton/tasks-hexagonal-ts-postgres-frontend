import { AuthRepository } from "../../ports/output/AuthRepository";
import { LoginDTO, AuthResponseDTO } from "../../shared/dtos/AuthDTO";

export class Login
{
	constructor(private readonly authRepository: AuthRepository) {}

	async execute(credentials: LoginDTO): Promise<AuthResponseDTO>
	{
		if (!credentials.email || !credentials.email.trim())
		{
			throw new Error("Email is required.");
		}

		if (!credentials.password || !credentials.password.trim())
		{
			throw new Error("Password is required.");
		}

		if (!credentials.email.includes("@"))
		{
			throw new Error("Invalid email.");
		}

		return this.authRepository.login(credentials);
	}
}