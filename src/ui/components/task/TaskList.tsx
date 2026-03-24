import { useState } from "react";
import { Task } from "../../../domain/entities/Task";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { Modal } from "../common/Modal";
import { useTasks } from "../../hooks/useTasks";

interface TaskListProps
{
	tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps)
{
	const { toggleTask, deleteTask } = useTasks();
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	function handleEdit(task: Task)
	{
		setEditingTask(task);
	}

	function handleCloseModal()
	{
		setEditingTask(null);
	}

	if (tasks.length === 0)
	{
		return (
			<div className="flex flex-col items-center justify-center py-16 text-gray-400">
				<span className="text-4xl mb-2">📋</span>
				<p className="text-sm">no tasks</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col gap-3">
				{
					tasks?.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onToggle={toggleTask}
							onEdit={handleEdit}
							onDelete={deleteTask}
						/>
					))
				}
			</div>
			<Modal
				isOpen={!!editingTask}
				title="Edit Task"
				onClose={handleCloseModal}
			>
				{
					editingTask
					&&
					<TaskForm
						task={editingTask}
						onClose={handleCloseModal}
					/>
				}
			</Modal>
		</>
	);
}