import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../../domain/entities/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../shared/dtos/TaskDTO";

interface TaskFormProps
{
	task?: Task;
	onClose?: () => void;
}

export function TaskForm({ task, onClose }: TaskFormProps)
{
	const { user } = useAuth();
	const { createTask, updateTask } = useTasks();
	const [title, setTitle] = useState(task?.title ?? "");
	const [description, setDescription] = useState(task?.description ?? "");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const isEditing = !!task;

	async function handleSubmit(e: React.FormEvent)
	{
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try
		{
			if (isEditing)
			{
				const data: UpdateTaskDTO = { id: task.id, title, description, userId: user!.id };
				await updateTask(task.id, data);
				if (onClose) { onClose(); }
			}
			else
			{
				if (!user) { throw new Error("User not authenticated."); }
				const data: CreateTaskDTO = { userId: user.id, title, description };
				await createTask(data);
				setTitle("");
				setDescription("");
			}
		}
		catch (err: unknown)
		{
			if (err instanceof Error) { setError(err.message); }
			else { setError("Error when save task. Try again."); }
		}
		finally
		{
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col p-[30px] rounded-[5px] mb-[20px] bg-light-50">
			<Input
				label="Títle"
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="task title"
				required
			/>
			<Input
				label="Description"
				name="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="putting a description (optional)"
			/>
			{
				error
				&&
				<span className="text-xs text-red-500">{error}</span>
			}
			<div className={`flex ${isEditing ? "justify-between" : "justify-end"}`}>
				{
					isEditing
					&&
					<Button
						label="cancel"
						variant="ghost"
						onClick={onClose}
					/>
				}
				<Button
					label={isEditing ? "save" : "insert"}
					type="submit"
					isLoading={isLoading}
					variant="success"
				/>
			</div>
		</form>
	);
}