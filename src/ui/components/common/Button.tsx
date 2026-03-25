interface ButtonProps
{
	label: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "danger" | "ghost" | "success";
	disabled?: boolean;
	isLoading?: boolean;
}

export function Button({ label, onClick, type = "button", variant = "primary", disabled, isLoading }: ButtonProps)
{
	const variants =
	{
		primary: "bg-primary-600 hover:bg-primary-700 text-white",
		danger: "bg-red-500 hover:bg-red-600 text-white",
		success: "bg-green-500 hover:bg-green-600 text-white",
		ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			className={`px-[12px] py-[8px] rounded-[5px] text-[16px] font-normal transition-colors disabled:opacity-50 ${variants[variant]} select-none`}
		>
			{isLoading ? "loading..." : label}
		</button>
	);
}