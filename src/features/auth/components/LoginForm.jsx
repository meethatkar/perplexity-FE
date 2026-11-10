import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const { login, guestLogin, loading, error, fieldErrors, user, clearError } =
    useAuth();
  const [formData, setFormData] = useState({
    userInfo: "",
    password: "",
  });
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [infoMessage, setInfoMessage] = useState(
    location.state?.infoMessage || "",
  );

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
    try {
      await login(formData);
      navigate("/");
    } catch {
      // Caught and stored in Redux
    }
  };

  const handleGuestSubmit = async () => {
    try {
      setIsGuestLoading(true);
      await guestLogin();
      navigate("/");
    } catch {
      // Caught and stored in Redux
    } finally {
      setIsGuestLoading(false);
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
          Sign in to aether-ai
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
          Enter your credentials to continue
        </p>
      </div>

      {infoMessage && (
        <div className="flex items-center gap-2.5 p-3.5 mb-6 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-xl leading-relaxed">
          <span className="shrink-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{infoMessage}</span>
        </div>
      )}

      {error && !Object.keys(fieldErrors || {}).length && (
        <div className="flex items-center gap-2 p-3 mb-6 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-xl">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email or Username"
          id="userInfo"
          type="text"
          value={formData.userInfo}
          onChange={handleChange}
          placeholder="name@example.com"
          error={fieldErrors?.userInfo}
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
            disabled={loading || isGuestLoading}
          >
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-slate-800" />
        <span className="absolute bg-slate-900/90 px-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
          or
        </span>
      </div>

      {/* Guest Mode Action Button */}
      <Button
        type="button"
        variant="secondary"
        onClick={handleGuestSubmit}
        disabled={loading || isGuestLoading}
        className="w-full !py-2.5 !rounded-xl font-medium text-sm flex items-center justify-center gap-2 text-slate-300 hover:text-white"
      >
        <svg
          className="w-4 h-4 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>
          {isGuestLoading ? "Creating guest session..." : "Continue as Guest"}
        </span>
      </Button>

      <p className="mt-6 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-slate-200 transition-colors hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
