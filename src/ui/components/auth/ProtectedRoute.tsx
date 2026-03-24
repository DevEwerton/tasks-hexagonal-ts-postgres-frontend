import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps
{
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps)
{
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading)
	{
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-secondary-700 text-[16px]">loading...</p>
			</div>
		);
	}

	if (!isAuthenticated) { return <Navigate to="/login" replace />; }

	return <>{children}</>;
}