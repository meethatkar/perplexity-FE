import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const SignupForm = () => {
  const { signup, loading, error, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleReset = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-10 mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200">
          Create Account
        </h2>
        <p className="mt-2 text-purple-200/80">Sign up to get started.</p>
      </div>

      {error && (
        <div className="p-3 mb-6 text-sm text-red-200 bg-red-500/20 border border-red-500/50 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@example.com"
        required
      />

      <Input
        label="Username"
        id="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Choose a username"
        required
      />

      <Input
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
      />

      <div className="flex flex-col gap-4 mt-8 sm:flex-row">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleReset}
          className="flex-1"
          disabled={loading}
        >
          Reset
        </Button>
      </div>

      <p className="mt-6 text-sm text-center text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-purple-300 transition-colors hover:text-purple-200"
        >
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
