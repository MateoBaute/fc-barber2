'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegistro = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmarPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            const registerResponse = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, telefono, password })
            });
            const registerData = await registerResponse.json();

            if (!registerData.success) {
                setError(registerData.message ?? "No se pudo crear la cuenta.");
                setLoading(false);
                return;
            }

            // Login automático después de registrarse
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });
            const loginData = await loginResponse.json();

            if (loginData.success) {
                router.push("/");
                router.refresh();
            } else {
                // La cuenta se creó bien, pero por algún motivo el auto-login falló
                router.push("/login");
            }
        } catch (err) {
            console.error(err);
            setError("Error al crear la cuenta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-surface border border-surface-border rounded-lg p-8 max-w-md w-full animate-slide-up">
                <h2 className="text-2xl font-bold text-accent mb-6">Crear cuenta</h2>

                <form onSubmit={handleRegistro} className="space-y-4">
                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                            autoFocus
                        />
                    </div>

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
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Teléfono <span className="text-text-muted">(opcional)</span>
                        </label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Tu número"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
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
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                            placeholder="Repetí tu contraseña"
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
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>

                    <p className="text-text-secondary text-sm text-center pt-2">
                        ¿Ya tenés cuenta?{" "}
                        <Link href="/login" className="text-accent hover:text-accent-strong">
                            Iniciar sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}