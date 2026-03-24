import { Task } from "../entities/Task";
import { TaskRepository } from "../../ports/output/TaskRepository";
import { UpdateTaskDTO } from "../../shared/dtos/TaskDTO";

export class UpdateTask
{
	constructor(private taskRepository: TaskRepository) {}

	async execute(id: string, data: UpdateTaskDTO): Promise<Task>
	{
		if (!id)
		{
			throw new Error("ID da tarefa não informado.");
		}

		if (data.title !== undefined && !data.title.trim())
		{
			throw new Error("O título da tarefa não pode estar vazio.");
		}

		return await this.taskRepository.update(id, data);
	}
}