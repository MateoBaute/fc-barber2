import { NextResponse } from "next/server";
import db from "@/lib/db";
import { obtenerUsuarioSesion } from "@/lib/auth";

export async function GET() {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion || sesion.rol !== 'admin') {
        return NextResponse.json({ success: false, message: "No autorizado." }, { status: 403 });
    }

    try {
        const [[turnosHoyRow]]: any = await db.query(
            "SELECT COUNT(*) AS total FROM turnos WHERE fecha = CURDATE() AND estado != 'cancelado'"
        );

        const [[turnosPendientesRow]]: any = await db.query(
            "SELECT COUNT(*) AS total FROM turnos WHERE estado = 'pendiente'"
        );

        const [[ingresosMesRow]]: any = await db.query(
            `SELECT COALESCE(SUM(precio), 0) AS total FROM turnos
             WHERE estado_pago = 'pagado'
               AND MONTH(fecha) = MONTH(CURDATE())
               AND YEAR(fecha) = YEAR(CURDATE())`
        );

        const [[completadosMesRow]]: any = await db.query(
            `SELECT COUNT(*) AS total FROM turnos
             WHERE estado = 'completado'
               AND MONTH(fecha) = MONTH(CURDATE())
               AND YEAR(fecha) = YEAR(CURDATE())`
        );

        const [servicioTopRows]: any = await db.query(
            `SELECT servicio, COUNT(*) AS cantidad FROM turnos
             WHERE estado != 'cancelado' AND servicio IS NOT NULL
               AND MONTH(fecha) = MONTH(CURDATE())
               AND YEAR(fecha) = YEAR(CURDATE())
             GROUP BY servicio
             ORDER BY cantidad DESC
             LIMIT 1`
        );

        const [proximosTurnos]: any = await db.query(
            `SELECT id, nombre, servicio, fecha, horario FROM turnos
             WHERE estado = 'pendiente' AND fecha >= CURDATE()
             ORDER BY fecha ASC, horario ASC
             LIMIT 5`
        );

        return NextResponse.json({
            success: true,
            estadisticas: {
                turnosHoy: turnosHoyRow.total,
                turnosPendientes: turnosPendientesRow.total,
                ingresosMes: Number(ingresosMesRow.total),
                completadosMes: completadosMesRow.total,
                servicioTop: servicioTopRows[0]?.servicio ?? null,
                proximosTurnos
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error en /api/admin/estadisticas:", error);
        return NextResponse.json({
            success: false,
            message: "Error al cargar las estadísticas."
        }, { status: 500 });
    }
}