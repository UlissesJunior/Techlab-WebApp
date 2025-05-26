import React from 'react';

interface DialogSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { id: string; name: string }[];
  placeholder?: string;
  className?: string;
  label?: string;
}

export default function DialogSelect({ options, placeholder, className, label, ...props }: DialogSelectProps) {
  return (
    <div className="w-full">
       <label className="block mb-1">{label}</label>
      <select
        className={`w-full p-3 rounded-md h-[56px] sm:h-[48px] ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}