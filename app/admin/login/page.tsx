'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });
        const data = await response.json();

        if (data.success && data.usuario?.rol === 'admin') {
            router.push("/admin");
            router.refresh();
        } else if (data.success) {
            setError("Esta cuenta no tiene permisos de administrador.");
        } else {
            setError(data.message ?? "Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-surface border border-surface-border rounded-lg p-8 max-w-md w-full animate-slide-up">
                <h2 className="text-2xl font-bold text-accent mb-6">Login Admin</h2>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Correo
                        </label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="admin@fcbarber.com"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa la contraseña"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                        />
                    </div>

                    {error && (
                        <p className="text-danger text-sm font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-accent hover:bg-accent-strong text-accent-text-on rounded font-medium transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}