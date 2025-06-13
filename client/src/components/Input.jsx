import React from "react";

const Input = ({ id, label, type = "text", placeholder, ...props }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full bg-surface border border-gray-600 text-text-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
};

export default Input;
