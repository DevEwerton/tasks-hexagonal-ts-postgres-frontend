import { Task } from "../entities/Task";
import { TaskRepository } from "../../ports/output/TaskRepository";

export class ToggleTask
{
	constructor(private taskRepository: TaskRepository) {}

	async execute(id: string, userId: string): Promise<Task>
	{
		if (!id)
		{
			throw new Error("ID da tarefa não informado.");
		}

		if (!userId)
		{
			throw new Error("Usuário não identificado.");
		}

		return await this.taskRepository.toggle(id, userId);
	}
}