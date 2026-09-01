export interface Servicio {
    slug: string;
    nombre: string;
    descripcion: string;
    precio: number;
    img: string;
}

export const servicios: Servicio[] = [
    {
        slug: "corte-pelo",
        nombre: "Corte de pelo",
        descripcion: "Un corte profesional adaptado a tu estilo, con técnicas modernas y clásicas.",
        precio: 300,
        img: "/imgServicios/servicioCorte.jpg",
    },
    {
        slug: "corte-barba",
        nombre: "Corte de Barba",
        descripcion: "Diseño y mantenimiento personalizado de tu barba con máxima precisión.",
        precio: 150,
        img: "/imgServicios/servicioCorteBarba.jpg",
    },
    {
        slug: "pelo-barba",
        nombre: "Pelo + Barba",
        descripcion: "Un corte de pelo profecional sumado a un corte de barba de excelente calidad.",
        precio: 350,
        img: "/imgServicios/servicioAfeitado.jpg",
    }
];