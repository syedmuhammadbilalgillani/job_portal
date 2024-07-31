import React from "react";

const TextAreaInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  required = false,
  className = "",
  disabled = false,
}) => {
  return (
    <>
      <div className={`w-full space-y-2 ${className}`}>
        <label htmlFor={name} className="font-bold">
          {label}
        </label>
        <textarea
          className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        ></textarea>
      </div>
    </>
  );
};
export default TextAreaInput;
