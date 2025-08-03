import React from "react";

import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";

import { ACCESS_TOKEN } from "@/constants/config";

const AuthLayout: React.FC = () => {
  const authToken = Cookies.get(ACCESS_TOKEN);

  if (authToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <p className="font-semibold">Kapal Lawd Article</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/auth-bg.avif"
          alt="auth background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
