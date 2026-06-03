import FormReservas from "@/app/components/reservas/formReservas";

export default function reservas(){
    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reservar Turnos</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 mb-6">Aquí puedes reservar tu turno para nuestros servicios de barbería. Completa el formulario a continuación con tus datos y elige el servicio que deseas reservar. Nuestro equipo se pondrá en contacto contigo para confirmar tu reserva y brindarte la mejor experiencia en FC Barber.</p>
            <FormReservas />
        </div>
    )
}