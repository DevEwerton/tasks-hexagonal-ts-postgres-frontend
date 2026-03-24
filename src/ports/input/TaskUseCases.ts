import { Task } from "../../domain/entities/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../shared/dtos/TaskDTO";

export interface ICreateTaskUseCase
{
	execute(data: CreateTaskDTO): Promise<Task>;
}

export interface IListTasksUseCase
{
	execute(userId: string): Promise<Task[]>;
}

export interface IUpdateTaskUseCase
{
	execute(id: string, data: UpdateTaskDTO): Promise<Task>;
}

export interface IDeleteTaskUseCase
{
	execute(id: string, userId: string): Promise<void>;
}

export interface IToggleTaskUseCase
{
	execute(id: string, userId: string): Promise<Task>;
}