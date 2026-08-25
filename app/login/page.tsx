'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });
            const data = await response.json();

            if (data.success) {
                router.push("/");
                router.refresh();
            } else {
                setError(data.message ?? "Correo o contraseña incorrectos");
            }
        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-surface border border-surface-border rounded-lg p-8 max-w-md w-full animate-slide-up">
                <h2 className="text-2xl font-bold text-accent mb-6">Iniciar sesión</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Correo
                        </label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="tu@correo.com"
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
                            placeholder="Tu contraseña"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                        />
                    </div>

                    {error && (
                        <p className="text-danger text-sm font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 bg-accent hover:bg-accent-strong disabled:opacity-60 text-accent-text-on rounded font-medium transition duration-300"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    <p className="text-text-secondary text-sm text-center pt-2">
                        ¿No tenés cuenta?{" "}
                        <Link href="/registro" className="text-accent hover:text-accent-strong">
                            Registrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}