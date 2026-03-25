interface InputProps
{
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: "text" | "email" | "password";
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	error?: string;
}

export function Input({ label, name, value, onChange, type = "text", placeholder, required, disabled, error }: InputProps)
{
	return (
		<div className="flex flex-col mb-[10px]">
			<label className="text-[16px] text-secondary-700 font-normal mb-[5px] select-none">{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				className={`text-[16px] text-secondary-700 px-[12px] py-[8px] border rounded-[5px] bg-white ${error ? "border-red-500" : "border-secondary-700"}`}
			/>
			{error && (<span className="text-[16px] text-red-500">{error}</span>)}
		</div>
	);
}