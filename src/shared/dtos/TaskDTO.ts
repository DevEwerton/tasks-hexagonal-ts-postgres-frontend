export interface CreateTaskDTO
{
	userId: string;
	title: string;
	description?: string;
}

export interface UpdateTaskDTO
{
	id: string;
	userId: string;
	title?: string;
	description?: string;
	completed?: boolean;
}