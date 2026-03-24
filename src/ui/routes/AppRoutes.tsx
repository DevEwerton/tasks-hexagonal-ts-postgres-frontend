import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { TaskProvider } from "../context/TaskContext";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { TasksPage } from "../pages/TasksPage";

export function AppRoutes()
{
	return (
		<BrowserRouter>
			<AuthProvider>
				<TaskProvider>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/tasks"
							element={
								<ProtectedRoute>
									<TasksPage />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<Navigate to="/login" replace />} />
					</Routes>
				</TaskProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}