import { Task } from "../entities/Task";
import { TaskRepository } from "../../ports/output/TaskRepository";
import { CreateTaskDTO } from "../../shared/dtos/TaskDTO";

export class CreateTask
{
	constructor(private taskRepository: TaskRepository) {}

	async execute(data: CreateTaskDTO): Promise<Task>
	{
		if (!data.title.trim())
		{
			throw new Error("O título da tarefa não pode estar vazio.");
		}

		return await this.taskRepository.save(data);
	}
}