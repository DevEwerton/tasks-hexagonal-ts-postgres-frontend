import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../ports/output/TaskRepository";
import { CreateTaskDTO, UpdateTaskDTO } from "../../shared/dtos/TaskDTO";

const mockTasks: Task[] =
[
	{
		id: "task-mock-001",
		userId: "user-mock-001",
		title: "Setup project structure",
		description: "Create the hexagonal architecture folder structure",
		completed: true,
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		id: "task-mock-002",
		userId: "user-mock-001",
		title: "Implement domain layer",
		description: "Create entities and use cases",
		completed: true,
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
	{
		id: "task-mock-003",
		userId: "user-mock-001",
		title: "Implement ports layer",
		description: "Create input and output port interfaces",
		completed: false,
		createdAt: new Date("2024-01-03"),
		updatedAt: new Date("2024-01-03"),
	},
	{
		id: "task-mock-004",
		userId: "user-mock-001",
		title: "Implement adapters layer",
		description: "Create HTTP and mock repository adapters",
		completed: false,
		createdAt: new Date("2024-01-04"),
		updatedAt: new Date("2024-01-04"),
	},
];

const tasks = [...mockTasks];

export class MockTaskRepository implements TaskRepository
{
	async findAllByUserId(userId: string): Promise<Task[]>
	{
		return tasks.filter((task) => task.userId === userId);
	}

	async save(data: CreateTaskDTO): Promise<Task>
	{
		const newTask: Task =
		{
			id: `task-mock-${Date.now()}`,
			userId: data.userId,
			title: data.title,
			description: data.description ?? "",
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		tasks.push(newTask);
		return newTask;
	}

	async update(id: string, data: UpdateTaskDTO): Promise<Task>
	{
		const index = tasks.findIndex((task) => task.id === id);
		if (index === -1) { throw new Error("Task not found."); }

		tasks[index] =
		{
			...tasks[index],
			...data,
			updatedAt: new Date(),
		};

		return tasks[index];
	}

	async delete(id: string, userId: string): Promise<void>
	{
		const index = tasks.findIndex((task) => task.id === id && task.userId === userId);
		if (index === -1) { throw new Error("Task not found."); }

		tasks.splice(index, 1);
	}

	async toggle(id: string, userId: string): Promise<Task>
	{
		const index = tasks.findIndex((task) => task.id === id && task.userId === userId);
		if (index === -1) { throw new Error("Task not found."); }

		tasks[index] =
		{
			...tasks[index],
			completed: !tasks[index].completed,
			updatedAt: new Date(),
		};

		return tasks[index];
	}
}