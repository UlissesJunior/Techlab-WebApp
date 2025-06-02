import React from 'react';

interface DialogButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function DialogButton({ className, children, ...props }: DialogButtonProps) {
  return (
    <button
      className={`w-full p-3 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}