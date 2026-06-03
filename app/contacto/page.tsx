export default function contacto(){

    interface Barbero{
        nombre: string;
        especialidad: string;
        experiencia: string;
        contacto: string;
        img: string;
    }

    const Barberos: Barbero[] = [
        {
            nombre: "Juan Pérez",
            especialidad: "Cortes clásicos y modernos",
            experiencia: "10 años",
            contacto: "juan.perez@fcbarber.com",
            img: "./imgBarberos/barbero1.jpg"
        },
        {
            nombre: "María Gómez",
            especialidad: "Barbas y afeitados",
            experiencia: "8 años",
            contacto: "maria.gomez@fcbarber.com",
            img: "./imgBarberos/barbero2.jpg"
        },
        {
            nombre: "Carlos Rodríguez",
            especialidad: "Cortes creativos y de tendencia",
            experiencia: "5 años",
            contacto: "carlos.rodriguez@fcbarber.com",
            img: "./imgBarberos/barbero3.jpg"
        }
    ];

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Contáctanos</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                ¿Tienes alguna pregunta o necesitas más información? ¡No dudes en contactarnos!
            </p>
            <h2 className="text-3xl font-bold mb-6">Nuestros Barberos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Barberos.map((barbero, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-2">{barbero.nombre}</h2>
                        <img src={barbero.img} alt={barbero.nombre} className="w-full h-48 object-cover rounded-md mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{barbero.especialidad}</p>
                        <p className="text-gray-500 dark:text-gray-500 mb-2">Experiencia: {barbero.experiencia}</p>
                        <p className="text-blue-500 dark:text-blue-400 underline">Contacto: {barbero.contacto}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}