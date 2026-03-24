import { AuthRepository } from "../../ports/output/AuthRepository";
import { TaskRepository } from "../../ports/output/TaskRepository";
import { HttpAuthRepository } from "../out/http/HttpAuthRepository";
import { HttpTaskRepository } from "../out/http/HttpTaskRepository";
import { MockAuthRepository } from "../mock/MockAuthRepository";
import { MockTaskRepository } from "../mock/MockTasksRepository";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

export const RepositoryFactory =
{
	authRepository(): AuthRepository
	{
		if (useMock) { return new MockAuthRepository(); }
		return new HttpAuthRepository();
	},

	taskRepository(): TaskRepository
	{
		if (useMock) { return new MockTaskRepository(); }
		return new HttpTaskRepository();
	},
};