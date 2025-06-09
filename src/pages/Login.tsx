import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      login(email, password);

      setTimeout(() => {
        const currentUser = JSON.parse(
          localStorage.getItem("current-user") || "null"
        );
        if (currentUser) {
          navigate("/");
        } else {
          setError("Invalid email or password");
        }
        setIsLoading(false);
      }, 100);
    } catch {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome <span className="dark:text-[#C6FF00] text-[#769700]">Back</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <Card>
          <CardHeader>
            <Link
              to="/"
              className="text-sm text-blue-600 dark:text-blue-400 hover:dark:text-[#C6FF00] text-[#769700] dark:hover:dark:text-[#C6FF00] text-[#769700] hover:underline mb-4 inline-block transition-colors"
            >
              ← Back to Home
            </Link>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#769700] dark:focus:ring-[#C6FF00] focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#769700] dark:focus:ring-[#C6FF00] focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-200 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C6FF00] rounded-full"></span>
                Demo Credentials:
              </h3>
              <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Admin:
                  </span>
                  <span>admin1@example.com / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Client:
                  </span>
                  <span>client1@example.com / client123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
