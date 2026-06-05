
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Servicios() {
    interface Servicio {
        nombre: string;
        descripcion: string;
        precio: number;
        img: string;
        beneficios: string[];
    }

    const servicios: Servicio[] = [
        {
            nombre: "Corte de Cabello",
            descripcion: "Un corte profesional adaptado a tu estilo, con técnicas modernas y clásicas.",
            precio: 20,
            img: "./imgServicios/servicioCorte.jpg",
            beneficios: ["Consulta de estilo", "Lavado incluido", "Termado y secado"]
        },
        {
            nombre: "Corte de Barba",
            descripcion: "Diseño y mantenimiento personalizado de tu barba con máxima precisión.",
            precio: 18,
            img: "./imgServicios/servicioCorteBarba.jpg",
            beneficios: ["Perfilado", "Tratamiento hidratante", "Consejo de cuidado"]
        },
        {
            nombre: "Afeitado Tradicional",
            descripcion: "Afeitado clásico con navaja afilada y productos de lujo.",
            precio: 15,
            img: "./imgServicios/servicioAfeitado.jpg",
            beneficios: ["Vapor relajante", "Crema premium", "Balm calmante"]
        }
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full py-12">
            <div className="max-w-6xl mx-auto space-y-12 animate-slide-up">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 animate-glow">
                        Nuestros Servicios
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Contamos con una amplia variedad de servicios de barbería profesional. 
                        Cada uno diseñado para brindarte la mejor experiencia y resultado.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {servicios.map((servicio, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative overflow-hidden rounded-2xl border border-yellow-500/30 hover:border-yellow-500 transition duration-300 transform hover:scale-105 bg-gradient-to-br from-gray-900 to-black shadow-lg"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden bg-black">
                                <Image
                                    src={servicio.img}
                                    alt={servicio.nombre}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                                
                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full font-bold shadow-lg">
                                    ${servicio.precio}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-bold text-yellow-400">
                                    {servicio.nombre}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {servicio.descripcion}
                                </p>

                                {/* Benefits */}
                                <div className={`space-y-2 overflow-hidden transition-all duration-300 ${hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-xs uppercase tracking-widest text-yellow-500 font-semibold">Incluye:</p>
                                    {servicio.beneficios.map((beneficio, i) => (
                                        <div key={i} className="flex items-center text-gray-300 text-sm">
                                            <span className="text-yellow-400 mr-2">✓</span>
                                            {beneficio}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <a
                                    href="/reservas"
                                    className="block w-full text-center mt-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 shadow-lg shadow-yellow-500/50"
                                >
                                    Reservar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="bg-gradient-to-r from-yellow-900/20 to-black border border-yellow-500/30 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                    <h3 className="text-2xl font-bold text-yellow-400">
                        ¿Necesitas más información?
                    </h3>
                    <p className="text-gray-300 max-w-xl mx-auto">
                        Todos nuestros servicios incluyen una consulta profesional inicial. 
                        Si tienes dudas sobre cuál es el mejor para ti, contáctanos.
                    </p>
                    <a
                        href="/contacto"
                        className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg shadow-yellow-500/50"
                    >
                        Contactar Ahora
                    </a>
                </div>
            </div>
        </div>

    );

}
