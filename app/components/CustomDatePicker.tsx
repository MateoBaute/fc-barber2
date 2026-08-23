'use client';

import { useState, useRef, useEffect } from 'react';

interface CustomDatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
}

export default function CustomDatePicker({ value, onChange, label }: CustomDatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date(value || new Date().toISOString().split('T')[0] + 'T00:00:00'));
    const pickerRef = useRef<HTMLDivElement>(null);

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleSelectDate = (day: number) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const formattedDate = selected.toISOString().split('T')[0];
        onChange(formattedDate);
        setIsOpen(false);
    };

    const handleToday = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        onChange(formattedDate);
        setCurrentDate(today);
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange('');
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayNames = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const days = [];
    const startDay = firstDayOfMonth(currentDate);
    const totalDays = daysInMonth(currentDate);

    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push(i);
    }

    const displayDate = value ? new Date(value + 'T00:00:00').toLocaleDateString('es-AR') : 'Seleccionar fecha';

    return (
        <div ref={pickerRef} className="relative">
            {label && (
                <label className="block text-accent font-semibold mb-3 text-sm uppercase tracking-wider">📅 {label}</label>
            )}
            
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg text-text-secondary focus:border-accent focus:bg-surface outline-none transition duration-300 hover:border-accent text-left flex justify-between items-center group"
            >
                <span>{displayDate}</span>
                <span className="text-accent group-hover:scale-110 transition">📅</span>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 bg-surface border border-surface-border rounded-lg shadow-xl shadow-black/20 p-4 z-50 w-full min-w-80 animate-slide-up">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-white/5 rounded-lg transition text-accent hover:text-accent-strong"
                        >
                            ◀
                        </button>
                        <h3 className="text-accent font-bold text-center flex-1">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h3>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-white/5 rounded-lg transition text-accent hover:text-accent-strong"
                        >
                            ▶
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day) => (
                            <div key={day} className="text-center text-xs font-bold text-accent py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => day && handleSelectDate(day)}
                                disabled={!day}
                                className={`aspect-square rounded-lg text-sm font-semibold transition duration-300 ${
                                    !day
                                        ? 'text-gray-600'
                                        : day === (value ? new Date(value + 'T00:00:00').getDate() : null) &&
                                          currentDate.getMonth() === new Date(value + 'T00:00:00').getMonth()
                                        ? 'bg-accent text-accent-text-on scale-105'
                                        : 'bg-background text-text-secondary hover:bg-white/5 hover:border-accent border border-surface-border'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Footer actions */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex-1 py-2 px-3 bg-transparent border border-surface-border text-text-secondary rounded-lg hover:bg-white/5 transition text-sm font-semibold"
                        >
                            Limpiar
                        </button>
                        <button
                            type="button"
                            onClick={handleToday}
                            className="flex-1 py-2 px-3 bg-accent text-accent-text-on rounded-lg hover:bg-accent-strong transition text-sm font-semibold"
                        >
                            Hoy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
