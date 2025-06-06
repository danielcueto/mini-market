import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

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
                const currentUser = JSON.parse(localStorage.getItem("current-user") || "null");
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <Link to="/" className="text-sm text-orange-500 hover:underline mb-4 block">
                    ← Volver
                </Link>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h3 className="text-sm font-semibold mb-2">Demo Credentials:</h3>
                    <div className="text-xs space-y-1">
                        <p><strong>Admin:</strong> admin1@example.com / admin123</p>
                        <p><strong>Client:</strong> client1@example.com / client123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}