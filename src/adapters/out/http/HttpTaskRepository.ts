import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../ports/output/TaskRepository";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../shared/dtos/TaskDTO";
import axiosInstance from "./axiosInstance";

export class HttpTaskRepository implements TaskRepository
{
	async findAllByUserId(userId: string): Promise<Task[]>
	{
		const response = await axiosInstance.get<Task[]>(`/tasks/${userId}`);
		return response.data;
	}

	async save(data: CreateTaskDTO): Promise<Task>
	{
		const response = await axiosInstance.post<Task>("/tasks", data);
		return response.data;
	}

	async update(id: string, data: UpdateTaskDTO): Promise<Task>
	{
		const response = await axiosInstance.put<Task>(`/tasks/${id}`, data);
		return response.data;
	}

	async delete(id: string, userId: string): Promise<void>
	{
		await axiosInstance.delete(`/tasks/${id}`, { data: { userId } });
	}

	async toggle(id: string, userId: string): Promise<Task>
	{
		const response = await axiosInstance.patch<Task>(`/tasks/${id}/toggle`, { userId });
		return response.data;
	}
}