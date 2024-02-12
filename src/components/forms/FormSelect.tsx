import { SelectOptionProp } from "@/types";
import { FC, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionProp[];
  placeholder?: string;
}
const FormSelect: FC<SelectProps> = ({
  options,
  onChange,
  id,
  name,
  placeholder,
  className,
  ...props
}) => {
  return (
    <select
      id={id}
      onChange={onChange}
      name={name}
      className={cn(
        " rounded-md w-full py-2 px-2 text-inputText  border-2 border-inputColor focus:outline-4  border-[#D0D5DD] focus:outline-none focus:border-[#32D583] focus:ring-1 focus:[#32D583] ",
        className
      )}
      {...props}
    >
      <option value="" disabled className="opacity-20">
        {placeholder}
      </option>
      {options.map((option) => (
        <option value={option.code} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
