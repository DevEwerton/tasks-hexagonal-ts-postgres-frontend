import { AuthRepository } from "../../ports/output/AuthRepository";

export class Logout
{
	constructor(private authRepository: AuthRepository) {}

	async execute(): Promise<void>
	{
		await this.authRepository.logout();
	}
}