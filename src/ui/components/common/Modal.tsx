interface ModalProps
{
	isOpen: boolean;
	title: string;
	onClose?: () => void;
	children: React.ReactNode;
}

export function Modal({ isOpen, title, children }: ModalProps)
{
	if (!isOpen) { return null; }

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="relative bg-light-50 rounded-[5px] shadow-md w-full max-w-md z-10">
				<div className="flex items-center justify-between px-[30px] pt-[20px]">
					<h2 className="text-[16px] font-semibold text-gray-800">
						{title}
					</h2>
				</div>
				{children}
			</div>
		</div>
	);
}