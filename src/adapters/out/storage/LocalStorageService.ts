const TOKEN_KEY = "tasks:token";
const USER_KEY = "tasks:user";

export const LocalStorageService =
{
	saveToken(token: string): void
	{
		localStorage.setItem(TOKEN_KEY, token);
	},

	getToken(): string | null
	{
		return localStorage.getItem(TOKEN_KEY);
	},

	removeToken(): void
	{
		localStorage.removeItem(TOKEN_KEY);
	},

	saveUser(user: object): void
	{
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	},

	getUser<T>(): T | null
	{
		const user = localStorage.getItem(USER_KEY);
		if (user) { return JSON.parse(user) as T; }
		return null;
	},

	removeUser(): void
	{
		localStorage.removeItem(USER_KEY);
	},

	clear(): void
	{
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	},
};