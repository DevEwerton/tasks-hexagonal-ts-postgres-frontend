import { Task } from "../../domain/entities/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../shared/dtos/TaskDTO";

export interface TaskRepository
{
	findAllByUserId(userId: string): Promise<Task[]>;
	save(data: CreateTaskDTO): Promise<Task>;
	update(id: string, data: UpdateTaskDTO): Promise<Task>;
	delete(id: string, userId: string): Promise<void>;
	toggle(id: string, userId: string): Promise<Task>;
}