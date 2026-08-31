'use client';

import { useState } from 'react';
import Image from 'next/image';
import { servicios } from '@/lib/servicios';

export default function Servicios() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full py-12">
            <div className="max-w-6xl mx-auto space-y-12 animate-slide-up">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-accent">
                        Nuestros Servicios
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        Contamos con una amplia variedad de servicios de barbería profesional.
                        Cada uno diseñado para brindarte la mejor experiencia y resultado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {servicios.map((servicio, index) => (
                        <div
                            key={servicio.slug}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative overflow-hidden rounded-2xl border border-surface-border hover:border-accent transition duration-300 transform hover:scale-105 bg-surface"
                        >
                            <div className="relative h-56 overflow-hidden bg-background">
                                <Image
                                    src={servicio.img}
                                    alt={servicio.nombre}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

                                <div className="absolute top-4 right-4 bg-accent text-accent-text-on px-4 py-2 rounded-full font-bold">
                                    ${servicio.precio}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-bold text-accent">
                                    {servicio.nombre}
                                </h2>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {servicio.descripcion}
                                </p>

                                <div className={`space-y-2 overflow-hidden transition-all duration-300 ${hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-xs uppercase tracking-widest text-accent font-semibold">Incluye:</p>
                                    {servicio.beneficios.map((beneficio, i) => (
                                        <div key={i} className="flex items-center text-text-secondary text-sm">
                                            <span className="text-accent mr-2">•</span>
                                            {beneficio}
                                        </div>
                                    ))}
                                </div>

                                
                                   <a href={`/reservas?servicio=${servicio.slug}`}
                                    className="block w-full text-center mt-4 py-3 bg-accent text-accent-text-on font-bold rounded-lg hover:bg-accent-strong transition duration-300"
                                >
                                    Reservar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface border border-surface-border rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                    <h3 className="text-2xl font-bold text-accent">
                        ¿Necesitas más información?
                    </h3>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Todos nuestros servicios incluyen una consulta profesional inicial.
                        Si tienes dudas sobre cuál es el mejor para ti, contáctanos.
                    </p>
                    
                       <a href="/contacto"
                        className="inline-block px-8 py-3 bg-transparent border border-surface-border text-text-secondary font-bold rounded-lg hover:bg-white/5 hover:border-accent transition duration-300"
                    >
                        Contactar Ahora
                    </a>
                </div>
            </div>
        </div>
    );
}