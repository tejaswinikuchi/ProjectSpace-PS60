import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { loginUser } from "@/lib/authApi";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await loginUser(
        username,
        password
      );

      if (result.success) {
        localStorage.setItem("role", result.role);

        navigate({
          to: "/dashboard",
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Backend connection failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Retain.AI Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-emerald-500 px-4 py-2 font-medium text-black"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-zinc-400">
          Demo Accounts:
          <br />
          admin / admin123
          <br />
          manager / manager123
          <br />
          analyst / analyst123
        </div>
      </div>
    </div>
  );
}