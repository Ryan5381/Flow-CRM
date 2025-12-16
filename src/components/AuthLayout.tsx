import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
