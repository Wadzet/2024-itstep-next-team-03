import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName?: string;
  type: "text" | "email" | "search";
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelName, ...props }, ref) => {
    return (
      <>
        {labelName ? <label>{labelName}</label> : null}

        <input
          type={type}
          className={`flex h-9 w-full border border-gray-300 bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export default Input;
