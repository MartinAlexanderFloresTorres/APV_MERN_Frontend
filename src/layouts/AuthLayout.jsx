import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="md:p-10 p-5 flex items-center justify-center min-h-screen flex-col gap-5 w-full max-w-4xl lg:w-3/4  mx-auto">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
