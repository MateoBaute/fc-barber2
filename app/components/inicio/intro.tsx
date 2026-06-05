'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Intro() {
    const images = ['/imagenes/1.jpg', '/imagenes/2.jpg', '/imagenes/3.jpg', '/imagenes/4.jpg'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length, autoPlay]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setAutoPlay(false);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setAutoPlay(false);
    };

    return (
        <section className="w-full">
            <div 
                className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px] overflow-hidden rounded-3xl shadow-2xl shadow-yellow-500/20 border border-yellow-500/30 hover:border-yellow-500/60 transition duration-300"
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
            >
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
                        <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition duration-300"></div>
                    </div>
                ))}

                {/* Left Arrow */}
                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-yellow-500/80 hover:bg-yellow-500 p-2 text-black font-bold transition duration-300 transform hover:scale-110 shadow-lg shadow-yellow-500/50"
                    aria-label="Imagen anterior"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-yellow-500/80 hover:bg-yellow-500 p-2 text-black font-bold transition duration-300 transform hover:scale-110 shadow-lg shadow-yellow-500/50"
                    aria-label="Imagen siguiente"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                setCurrentIndex(index);
                                setAutoPlay(false);
                            }}
                            className={`rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-8 h-3 bg-yellow-500 shadow-lg shadow-yellow-500/70' 
                                    : 'w-3 h-3 bg-yellow-500/50 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50'
                            }`}
                            aria-label={`Ir a la imagen ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-6 right-6 z-20 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-yellow-400 font-bold border border-yellow-500/30">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </section>
    );
}
