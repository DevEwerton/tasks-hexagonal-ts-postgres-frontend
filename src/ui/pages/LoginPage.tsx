import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { LoginDTO } from "../../shared/dtos/AuthDTO";

export function LoginPage()
{
	const { login } = useAuth();
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState<LoginDTO>({ email: "", password: "" });
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent)
	{
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try
		{
			await login(credentials);
			navigate("/tasks");
		}
		catch (err: unknown)
		{
			if (err instanceof Error) { setError(err.message); }
			else { setError("Error when to login. Try again."); }
		}
		finally
		{
			setIsLoading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>)
	{
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-secondary-50">
			<div className="p-[30px] min-w-[350px] rounded-[5px] bg-light-50">
				<h1 className="text-center m-[20px] text-[28px] text-secondary-700 select-none">LOGIN</h1>
				<form onSubmit={handleSubmit} className="flex flex-col">
					<Input
						label="Mail"
						name="email"
						type="email"
						value={credentials.email}
						onChange={handleChange}
						placeholder="name@domain.com"
						required
					/>
					<Input
						label="Password"
						name="password"
						type="password"
						value={credentials.password}
						onChange={handleChange}
						placeholder="••••••••"
						required
					/>
					{error && (<p className="text-[16px] text-danger-400 mb-[5px]">{error}</p>)}
					<Button
						label={isLoading ? "wait..." : "login"}
						type="submit"
						isLoading={isLoading}
					/>
				</form>
			</div>
		</div>
	);
}