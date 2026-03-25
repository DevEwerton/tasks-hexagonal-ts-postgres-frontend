import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../domain/entities/User";
import { Login } from "../../domain/use-cases/Login";
import { Logout } from "../../domain/use-cases/Logout";
import { LoginDTO } from "../../shared/dtos/AuthDTO";
import { RepositoryFactory } from "../../adapters/factory/RepositoryFactory";
import { LocalStorageService } from "../../adapters/out/storage/LocalStorageService";

export interface AuthContextData
{
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login(credentials: LoginDTO): Promise<void>;
	logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authRepository = RepositoryFactory.authRepository();
const loginUseCase = new Login(authRepository);
const logoutUseCase = new Logout(authRepository);

export function AuthProvider({ children }: { children: React.ReactNode })
{
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		async function loadUser()
		{
			const storedUser = await authRepository.getCurrentUser();
			if (storedUser) { setUser(storedUser); }
			setIsLoading(false);
		}

		loadUser();
	}, []);

	async function login(credentials: LoginDTO): Promise<void>
	{
		const response = await loginUseCase.execute(credentials);
		await authRepository.saveToken(response.token);
		LocalStorageService.saveUser(response.user);
		console.log("response: ", response);
		setUser(response.user);
	}

	async function logout(): Promise<void>
	{
		await logoutUseCase.execute();
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextData
{
	return useContext(AuthContext);
}