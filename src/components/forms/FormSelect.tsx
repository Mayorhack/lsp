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
      className=" rounded-md w-full py-3 px-2 text-inputText   border-2 border-inputColor focus:outline-4  bg-transparent focus:outline-inputColor outline-solid outline-inputColor outline-4 hover:border-[#ff880098] "
    >
      <option value="">Select {placeholder}</option>
      {options.map((option) => (
        <option value={option.code} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
