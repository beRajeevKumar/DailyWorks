import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
      console.error(err.response);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Create an account
        </h1>
        <p className="text-text-secondary">
          Sign up now and unlock exclusive access!
        </p>
      </div>

      {success ? (
        <div className="text-center bg-surface p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-2">Success!</h2>
          <p className="text-text-secondary">
            Your account has been created. Redirecting you to the login page...
          </p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={onSubmit}>
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="Jonas Smith"
            value={name}
            onChange={onChange}
            required
          />
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded bg-surface border-gray-600 text-primary focus:ring-primary"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-text-secondary"
            >
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                terms of service
              </a>
            </label>
          </div>

          <Button type="submit" variant="primary">
            Sign up
          </Button>

          <p className="text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

export default SignupPage;
