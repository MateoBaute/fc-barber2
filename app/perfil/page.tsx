'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Perfil {
    nombre: string;
    correo: string;
    telefono: string | null;
    rol: 'cliente' | 'admin';
    created_at: string;
}

export default function PerfilPage() {
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cambiarPassword, setCambiarPassword] = useState(false);
    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [passwordConfirmar, setPasswordConfirmar] = useState("");

    const router = useRouter();

    async function cargarPerfil() {
        try {
            const response = await fetch('/api/auth/perfil');
            const data = await response.json();

            if (data.success) {
                setPerfil(data.usuario);
                setNombre(data.usuario.nombre);
                setCorreo(data.usuario.correo);
                setTelefono(data.usuario.telefono ?? "");
            } else {
                router.push("/login");
            }
        } catch (err) {
            console.error(err);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarPerfil();
    }, []);

    function cancelarEdicion() {
        if (!perfil) return;
        setNombre(perfil.nombre);
        setCorreo(perfil.correo);
        setTelefono(perfil.telefono ?? "");
        setCambiarPassword(false);
        setPasswordActual("");
        setPasswordNueva("");
        setPasswordConfirmar("");
        setError("");
        setEditando(false);
    }

    async function guardarCambios(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setExito("");

        if (cambiarPassword && passwordNueva !== passwordConfirmar) {
            setError("Las contraseñas nuevas no coinciden.");
            return;
        }

        setGuardando(true);
        try {
            const response = await fetch('/api/auth/perfil', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    correo,
                    telefono,
                    ...(cambiarPassword ? { passwordActual, passwordNueva } : {})
                })
            });
            const data = await response.json();

            if (data.success) {
                setExito("Perfil actualizado correctamente.");
                setCambiarPassword(false);
                setPasswordActual("");
                setPasswordNueva("");
                setPasswordConfirmar("");
                setEditando(false);
                await cargarPerfil();
            } else {
                setError(data.message ?? "No se pudo actualizar el perfil.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al actualizar el perfil.");
        } finally {
            setGuardando(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-accent">Cargando...</p>
            </div>
        );
    }

    if (!perfil) return null;

    const inicial = perfil.nombre.charAt(0).toUpperCase();
    const fechaMiembro = new Date(perfil.created_at).toLocaleDateString('es-UY', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen px-4 py-16 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-accent mb-8">Mi perfil</h1>

            <div className="bg-surface border border-surface-border rounded-xl p-8 space-y-8">
                {/* Encabezado con avatar */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent text-accent-text-on flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {inicial}
                    </div>
                    <div>
                        <p className="text-foreground text-xl font-bold">{perfil.nombre}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-text-muted text-sm">
                                Cliente desde {fechaMiembro}
                            </span>
                            {perfil.rol === 'admin' && (
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent/20 text-accent">
                                    Admin
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {exito && !editando && (
                    <p className="text-accent text-sm font-medium bg-accent/10 border border-accent/30 rounded-lg px-4 py-2">
                        {exito}
                    </p>
                )}

                {!editando ? (
                    <>
                        {/* Vista de solo lectura */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-surface-border pb-3">
                                <span className="text-text-muted text-sm">Correo</span>
                                <span className="text-foreground text-sm">{perfil.correo}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-surface-border pb-3">
                                <span className="text-text-muted text-sm">Teléfono</span>
                                <span className="text-foreground text-sm">
                                    {perfil.telefono || "No especificado"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                <span className="text-text-muted text-sm">Tipo de cuenta</span>
                                <span className="text-foreground text-sm capitalize">{perfil.rol}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => { setEditando(true); setExito(""); }}
                            className="w-full px-4 py-2 bg-accent hover:bg-accent-strong text-accent-text-on rounded font-medium transition duration-300"
                        >
                            Editar perfil
                        </button>
                    </>
                ) : (
                    /* Formulario de edición */
                    <form onSubmit={guardarCambios} className="space-y-4">
                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground focus:outline-none focus:border-accent transition"
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
                                className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground focus:outline-none focus:border-accent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder="Opcional"
                                className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                            />
                        </div>

                        <div className="pt-2 border-t border-surface-border">
                            <button
                                type="button"
                                onClick={() => setCambiarPassword(!cambiarPassword)}
                                className="text-accent hover:text-accent-strong text-sm font-medium mt-3"
                            >
                                {cambiarPassword ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
                            </button>
                        </div>

                        {cambiarPassword && (
                            <div className="space-y-4 animate-slide-up">
                                <div>
                                    <label className="block text-text-secondary text-sm font-medium mb-2">
                                        Contraseña actual
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordActual}
                                        onChange={(e) => setPasswordActual(e.target.value)}
                                        className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground focus:outline-none focus:border-accent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm font-medium mb-2">
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordNueva}
                                        onChange={(e) => setPasswordNueva(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground placeholder-text-muted focus:outline-none focus:border-accent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm font-medium mb-2">
                                        Confirmar nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordConfirmar}
                                        onChange={(e) => setPasswordConfirmar(e.target.value)}
                                        className="w-full px-4 py-2 bg-background border border-surface-border rounded text-foreground focus:outline-none focus:border-accent transition"
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <p className="text-danger text-sm font-medium">{error}</p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={guardando}
                                className="flex-1 px-4 py-2 bg-accent hover:bg-accent-strong disabled:opacity-60 text-accent-text-on rounded font-medium transition duration-300"
                            >
                                {guardando ? "Guardando..." : "Guardar cambios"}
                            </button>
                            <button
                                type="button"
                                onClick={cancelarEdicion}
                                className="flex-1 px-4 py-2 bg-transparent hover:bg-white/5 border border-surface-border text-text-secondary rounded font-medium transition duration-300"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}