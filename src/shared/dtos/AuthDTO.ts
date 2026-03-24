import { User } from "@/domain/entities/User";

export interface LoginDTO
{
	email: string;
	password: string;
}

export interface AuthResponseDTO
{
	token: string;
	user: User;
}