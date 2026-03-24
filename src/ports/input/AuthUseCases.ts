import { User } from "../../domain/entities/User";
import { LoginDTO } from "../../shared/dtos/AuthDTO";

export interface ILoginUseCase
{
	execute(credentials: LoginDTO): Promise<User>;
}

export interface ILogoutUseCase
{
	execute(): Promise<void>;
}