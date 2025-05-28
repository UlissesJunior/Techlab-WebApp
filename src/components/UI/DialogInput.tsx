import React from 'react';

interface DialogInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export default function DialogInput({ className, label, ...props }: DialogInputProps) {
  return (
    <div className="w-full">
      <label className="block mb-1 text-color-1">{label}</label>
      <input
        className={`w-full p-3 rounded-md h-[56px] sm:h-[48px] ${className}`}
        {...props}
      />
    </div>
  );
}