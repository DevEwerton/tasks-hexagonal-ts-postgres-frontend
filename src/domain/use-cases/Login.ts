import { User } from "../entities/User";
import { AuthRepository } from "../../ports/output/AuthRepository";
import { LoginDTO } from "../../shared/dtos/AuthDTO";

export class Login
{
	constructor(private authRepository: AuthRepository) {}

	async execute(credentials: LoginDTO): Promise<User>
	{
		if (!credentials.email.trim())
		{
			throw new Error("E-mail não informado.");
		}

		if (!credentials.password.trim())
		{
			throw new Error("Senha não informada.");
		}

		if (!credentials.email.includes("@"))
		{
			throw new Error("E-mail inválido.");
		}

		return await this.authRepository.login(credentials);
	}
}