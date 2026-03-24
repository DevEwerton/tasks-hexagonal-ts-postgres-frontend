import { createContext, useContext, useState } from "react";
import { Task } from "../../domain/entities/Task";
import { CreateTask } from "../../domain/use-cases/CreateTask";
import { ListTasks } from "../../domain/use-cases/ListTasks";
import { UpdateTask } from "../../domain/use-cases/UpdateTask";
import { DeleteTask } from "../../domain/use-cases/DeleteTask";
import { ToggleTask } from "../../domain/use-cases/ToggleTask";
import { CreateTaskDTO, UpdateTaskDTO } from "../../shared/dtos/TaskDTO";
import { RepositoryFactory } from "../../adapters/factory/RepositoryFactory";

interface TaskContextData
{
	tasks: Task[];
	isLoading: boolean;
	fetchTasks(userId: string): Promise<void>;
	createTask(data: CreateTaskDTO): Promise<void>;
	updateTask(id: string, data: UpdateTaskDTO): Promise<void>;
	deleteTask(id: string, userId: string): Promise<void>;
	toggleTask(id: string, userId: string): Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);
const taskRepository = RepositoryFactory.taskRepository();
const listTasksUseCase = new ListTasks(taskRepository);
const createTaskUseCase = new CreateTask(taskRepository);
const updateTaskUseCase = new UpdateTask(taskRepository);
const deleteTaskUseCase = new DeleteTask(taskRepository);
const toggleTaskUseCase = new ToggleTask(taskRepository);

export function TaskProvider({ children }: { children: React.ReactNode })
{
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchTasks(userId: string): Promise<void>
	{
		setIsLoading(true);
		setTimeout(async() => {
			const data = await listTasksUseCase.execute(userId);
			setTasks(data);
			setIsLoading(false);
		}, 3000);
	}

	async function createTask(data: CreateTaskDTO): Promise<void>
	{
		const newTask = await createTaskUseCase.execute(data);
		setTasks((prev) => [...prev, newTask]);
	}

	async function updateTask(id: string, data: UpdateTaskDTO): Promise<void>
	{
		const updatedTask = await updateTaskUseCase.execute(id, data);
		setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
	}

	async function deleteTask(id: string, userId: string): Promise<void>
	{
		await deleteTaskUseCase.execute(id, userId);
		setTasks((prev) => prev.filter((task) => task.id !== id));
	}

	async function toggleTask(id: string, userId: string): Promise<void>
	{
		const updatedTask = await toggleTaskUseCase.execute(id, userId);
		setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
	}

	return (
		<TaskContext.Provider value={{ tasks, isLoading, fetchTasks, createTask, updateTask, deleteTask, toggleTask }}>
			{children}
		</TaskContext.Provider>
	);
}

export function useTasks(): TaskContextData
{
	return useContext(TaskContext);
}