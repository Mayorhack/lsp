import { SelectOptionProp } from "@/types";
import { FC, SelectHTMLAttributes } from "react";

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
}) => {
  return (
    <select
      id={id}
      onChange={onChange}
      name={name}
      className=" rounded-md w-full py-3 px-2 text-inputText mb-[40px]   border-2 border-inputColor focus:outline-4  border-[#D0D5DD] focus:outline-none focus:border-[#32D583] focus:ring-1 focus:[#32D583] ">
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option value={option.code} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
