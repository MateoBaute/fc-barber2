

export default function servicios() {

    interface servicio {
        nombre: string;
        descripcion: string;
        precio: number;
        img: string;
    }

    const servicios: servicio[] = [
        {
            nombre: "Corte de barba",
            descripcion: "Un corte y arreglo de barba personalizado, que resalta tus rasgos faciales y estilo.",
            precio: 18,
            img: "./imgServicios/servicioCorteBarba.jpg"
        },
        {
            nombre: "Corte de cabello",
            descripcion: "Un corte de cabello clásico o moderno, adaptado a tu estilo y preferencias.",
            precio: 20,
            img: "./imgServicios/servicioCorte.jpg"
        },

        {
            nombre: "Afeitado",
            descripcion: "Un afeitado tradicional con navaja, que incluye cuidado de la piel y un acabado suave.",
            precio: 15,
            img: "./imgServicios/servicioAfeitado.jpg"
        }
    ]

    return (
        <div>
            <h1>Servicios</h1>
            <p>Aquí puedes encontrar una descripción de los servicios que ofrecemos en nuestra barbería, junto con sus precios. Nuestro equipo de barberos profesionales está dedicado a brindarte el mejor servicio y asegurarse de que salgas satisfecho con tu nuevo look.</p>
            <div className="mt-5 text-gray-600 dark:text-gray-400 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicios.map((servicio, index) => (
                    <div className="p-2 mb-4 max-w-lg border border-gray-300 dark:border-gray-600 rounded-lg shadow-md" key={index}>
                        <div>
                            <img src={servicio.img} alt={servicio.nombre} className="w-full border rounded-lg h-48 object-cover mb-2" />
                        </div>

                        <h2>{servicio.nombre}</h2>
                        <p>{servicio.descripcion}</p>
                        <p>Precio: ${servicio.precio.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}