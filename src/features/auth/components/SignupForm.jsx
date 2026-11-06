import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const SignupForm = () => {
  const { signup, loading, error, fieldErrors, user, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors && fieldErrors[name]) {
      clearError(name);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      const res = await signup(formData);
      setSuccessMessage(
        res.message || "Registration successful! Please check your email to verify.",
      );
    } catch {
      // Caught and stored in Redux
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
      {/* Brand & Title */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
          Create your account
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
          Get started with aether-ai
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-3 mb-6 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && !Object.keys(fieldErrors || {}).length && !successMessage && (
        <div className="flex items-center gap-2 p-3 mb-6 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-xl">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={fieldErrors?.email}
          required
        />

        <Input
          label="Username"
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="your_username"
          error={fieldErrors?.username}
          required
        />

        <Input
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={fieldErrors?.password}
          required
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full !py-2.5 !rounded-xl font-medium text-sm"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-slate-200 transition-colors hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
