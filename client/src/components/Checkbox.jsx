import React from "react";

const Checkbox = ({ id, label }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded bg-surface border-gray-600 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-background focus:ring-offset-2"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-text-secondary">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
