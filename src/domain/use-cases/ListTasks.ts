import { Task } from "../entities/Task";
import { TaskRepository } from "../../ports/output/TaskRepository";

export class ListTasks
{
	constructor(private taskRepository: TaskRepository) {}

	async execute(userId: string): Promise<Task[]>
	{
		if (!userId)
		{
			throw new Error("Usuário não identificado.");
		}

		return await this.taskRepository.findAllByUserId(userId);
	}
}