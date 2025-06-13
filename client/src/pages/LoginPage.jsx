import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useAuth } from "../contexts/AuthContext";
import { Check } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-10">
        {/* SINGLE CHECKMARK ICON */}
        <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
          <Check className="text-background" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Welcome back!
        </h1>
        <p className="text-text-secondary">
          Please enter your details to sign in.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="hello@example.com"
          value={email}
          onChange={onChange}
          required
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={onChange}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center font-semibold">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Checkbox id="remember-me" label="Remember for 30 days" />
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
