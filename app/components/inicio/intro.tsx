'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Intro() {
    const images = ['/imagenes/1.jpg', '/imagenes/2.jpg', '/imagenes/3.jpg', '/imagenes/4.jpg'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section className="w-full">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px] overflow-hidden rounded-3xl shadow-2xl">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={src}
                            alt={`Imagen ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition hover:bg-black/70"
                    aria-label="Imagen anterior"
                >
                    ❮
                </button>

                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition hover:bg-black/70"
                    aria-label="Imagen siguiente"
                >
                    ❯
                </button>

                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`h-3 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'w-3 bg-white/60 hover:bg-white'}`}
                            aria-label={`Ir a la imagen ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
