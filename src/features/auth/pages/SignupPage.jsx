import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-950 p-4 sm:p-6 text-slate-100">
      {/* Subtle architectural grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
