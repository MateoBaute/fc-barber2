export interface Servicio {
    slug: string;
    nombre: string;
    descripcion: string;
    precio: number;
    img: string;
}

export const servicios: Servicio[] = [
    {
        slug: "corte-cabello",
        nombre: "Corte de Cabello",
        descripcion: "Un corte profesional adaptado a tu estilo, con técnicas modernas y clásicas.",
        precio: 300,
        img: "/imgServicios/servicioCorte.jpg",
    },
    {
        slug: "corte-barba",
        nombre: "Corte de Barba",
        descripcion: "Diseño y mantenimiento personalizado de tu barba con máxima precisión.",
        precio: 100,
        img: "/imgServicios/servicioCorteBarba.jpg",
    },
    {
        slug: "afeitado-tradicional",
        nombre: "Afeitado Tradicional",
        descripcion: "Afeitado clásico con navaja afilada y productos de lujo.",
        precio: 250,
        img: "/imgServicios/servicioAfeitado.jpg",
    }
];