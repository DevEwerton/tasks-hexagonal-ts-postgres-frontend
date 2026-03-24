import { Button } from "../common/Button";
import { Task } from "../../../domain/entities/Task";
import { formatDate } from "../../../shared/utils/formatters";
import { truncateText } from "../../../shared/utils/formatters";

interface TaskCardProps
{
	task: Task;
	onToggle: (id: string, userId: string) => void;
	onEdit: (task: Task) => void;
	onDelete: (id: string, userId: string) => void;
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps)
{
	return (
		<div className={`bg-light-50 rounded-[5px] shadow-md p-[30px] flex flex-col border-l-[5px] ${task.completed ? "border-green-500" : "border-red-500"}`}>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						checked={task.completed}
						onChange={() => onToggle(task.id, task.userId)}
						className="mt-1 w-4 h-4 accent-primary-600 cursor-pointer"
					/>
					<div className="flex flex-col gap-1">
						<span className={`text-[16px] font-bold text-secondary-800 ${task.completed ? "line-through text-secondary-400" : ""}`}>
							{task.title}
						</span>
						{
							task.description
							&&
							<span className="text-[14px] font-normal text-secondary-500">
								{truncateText(task.description, 100)}
							</span>
						}
					</div>
				</div>
				<div className="flex items-center gap-2 shrink-0">
					<Button
						label="edit"
						variant="ghost"
						onClick={() => onEdit(task)}
					/>
					<Button
						label="delete"
						variant="danger"
						onClick={() => onDelete(task.id, task.userId)}
					/>
				</div>
			</div>
			<span className="text-[12px] text-secondary-400 mt-[5px]">
				Created at {formatDate(task.createdAt)}
			</span>
		</div>
	);
}