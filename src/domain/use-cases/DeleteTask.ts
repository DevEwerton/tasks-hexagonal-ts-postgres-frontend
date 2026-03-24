import { TaskRepository } from "../../ports/output/TaskRepository";

export class DeleteTask
{
	constructor(private taskRepository: TaskRepository) {}

	async execute(id: string, userId: string): Promise<void>
	{
		if (!id)
		{
			throw new Error("ID da tarefa não informado.");
		}

		if (!userId)
		{
			throw new Error("Usuário não identificado.");
		}

		await this.taskRepository.delete(id, userId);
	}
}