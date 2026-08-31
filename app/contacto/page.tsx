'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contacto() {

    interface Barbero {
        nombre: string;
        especialidad: string;
        experiencia: string;
        contacto: string;
        img: string;
        descripcion: string;
    }

    const Barberos: Barbero[] = [
        {
            nombre: "Juan Pérez",
            especialidad: "Cortes clásicos y modernos",
            experiencia: "10 años",
            contacto: "juan.perez@fcbarber.com",
            img: "/imgBarberos/barbero1.jpg",
            descripcion: "Especialista en cortes tradicionales con acabados modernos. Su técnica precisa y atención al detalle lo hacen el favorito para clientes exigentes."
        },
        {
            nombre: "María Gómez",
            especialidad: "Barbas y afeitados",
            experiencia: "8 años",
            contacto: "maria.gomez@fcbarber.com",
            img: "/imgBarberos/barbero2.jpg",
            descripcion: "Experta en diseño de barbas y afeitados tradicionales. Conoce todas las técnicas para mantener tu barba impecable."
        },
        {
            nombre: "Carlos Rodríguez",
            especialidad: "Cortes creativos y de tendencia",
            experiencia: "5 años",
            contacto: "carlos.rodriguez@fcbarber.com",
            img: "/imgBarberos/barbero3.jpg",
            descripcion: "Artista del corte con visión creativa. Siempre atento a las últimas tendencias y estilos internacionales de moda."
        }
    ];

    const [selectedBarbero, setSelectedBarbero] = useState<number | null>(null);
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Gracias por tu mensaje. Te contactaremos pronto.');
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <div className="w-full py-12">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-4 animate-slide-up">
                    <h1 className="text-5xl md:text-6xl font-bold text-accent">
                        Contáctanos
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        ¿Preguntas o necesitas información? Nuestro equipo está listo para ayudarte.
                        También conoce a nuestros barberos profesionales.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                    <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 text-center">
                        <h3 className="text-xl font-bold text-accent mb-2">Ubicación</h3>
                        <p className="text-text-secondary">Calle Principal 123,<br />Centro de la Ciudad</p>
                    </div>
                    <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 text-center">
                        <h3 className="text-xl font-bold text-accent mb-2">Teléfono</h3>
                        <p className="text-text-secondary">+598 2 1234 5678<br />Lun-Sab: 9:00 - 19:00</p>
                    </div>
                    <div className="p-6 bg-surface border border-surface-border rounded-lg hover:border-accent transition duration-300 text-center">
                        <h3 className="text-xl font-bold text-accent mb-2">Email</h3>
                        <p className="text-text-secondary break-words">info@fcbarber.com<br />reservas@fcbarber.com</p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="space-y-8 animate-slide-up">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-accent mb-4">Nuestro Equipo</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Conoce a los barberos profesionales que hacen de FC Barber un lugar especial.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Barberos.map((barbero, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedBarbero(selectedBarbero === index ? null : index)}
                                className="group cursor-pointer relative overflow-hidden rounded-2xl border border-surface-border hover:border-accent transition duration-300 transform hover:scale-105 bg-surface"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-background">
                                    <Image
                                        src={barbero.img}
                                        alt={barbero.nombre}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                                </div>

                                {/* Info */}
                                <div className="p-6 space-y-3">
                                    <h3 className="text-2xl font-bold text-accent">
                                        {barbero.nombre}
                                    </h3>
                                    <p className="text-accent-strong font-semibold">
                                        {barbero.especialidad}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {barbero.experiencia} de experiencia
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}