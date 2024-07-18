// src/components/TextInput.js
import React from "react";

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) => {
  return (
    <div className={`w-full space-y-2 ${className}`}>
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <input
        className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;

{
  /* <Input name={} label={} type={} value={} onChange={} placeholder={} required/> */
}
