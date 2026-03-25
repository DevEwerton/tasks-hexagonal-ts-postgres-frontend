import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/task/TaskList";
import { TaskForm } from "../components/task/TaskForm";
import { Button } from "../components/common/Button";

export function TasksPage()
{
	const { user, logout } = useAuth();
	const { tasks, isLoading } = useTasks();
	const { fetchTasks } = useTasks();
	console.log("tasks: ", tasks);
	useEffect(() =>
	{
		if (user) { fetchTasks(user.id); }
	}, [user]);

	async function handleLogout()
	{
		await logout();
	}

	return (
		<div className="min-h-screen bg-secondary-50">
			<header className="bg-white shadow-md flex items-center justify-between px-[20px] py-[10px]">
				<h1 className="text-center text-secondary-700 text-[28px] select-none">YOUR TASKS</h1>
				<div className="flex items-center">
					<span className="text-gray-600 mr-[10px] text-[18px] select-none">{user?.name}</span>
					<Button onClick={handleLogout} label="exit"/>
				</div>
			</header>
			<main className="p-[20px] max-w-[650px] mx-auto">
				<TaskForm />
				{
					isLoading
					?
					<p className="text-center">loading your tasks...</p>
					:
					<TaskList tasks={tasks} />
				}
			</main>
		</div>
	);
}