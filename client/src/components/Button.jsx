import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "w-full font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";

  const variants = {
    primary:
      "bg-primary text-background hover:bg-primary-hover focus:ring-primary",
    secondary:
      "bg-surface text-text-primary hover:bg-gray-700 focus:ring-gray-500",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
