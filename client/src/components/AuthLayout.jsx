import React from "react";
import authImage from "../assets/auth-image.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:max-w-5xl flex bg-surface rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          {children}
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={authImage}
            alt="Productivity inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
