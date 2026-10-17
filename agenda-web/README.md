# Agenda web: consulta jurídica con pago en línea

Página para que un cliente nuevo escoja día y hora, deje sus datos y pague una consulta por videollamada.
Proyecto independiente del sistema jurídico de este repositorio. No usa dependencias externas (solo Node 20 o superior).

## Probar en su computador (modo de prueba, sin cobrar)

    cd agenda-web
    cp .env.example .env
    npm run dev          # abre http://localhost:3000
    npm test

## Cómo funciona

1. La página consulta `/api/disponibilidad`: genera los cupos del horario (lunes a viernes, 8 a 12 y 2 a 5, hora de Colombia, 45 minutos más 60 de margen) y quita los ocupados.
2. Al enviar el formulario, `/api/reservar` valida los datos, retiene el cupo 30 minutos como evento provisional "PENDIENTE DE PAGO" y envía al cliente a la pasarela.
3. Al volver, `/api/confirmar` le pregunta a la pasarela si el pago fue aprobado (no confía en el navegador). Si lo fue, confirma el evento, crea el enlace de Meet y Google envía la invitación al correo del cliente.

No hay base de datos: el estado vive en su Google Calendar.

## Para pasar a producción (MODO_PRUEBA=0)

1. Cuenta aprobada en la pasarela y llaves en `.env` (nunca en el repositorio).
2. Credenciales de Google Calendar (cliente OAuth y token de actualización de la cuenta del despacho).
3. Nombre y precio definitivos de la consulta, y festivos del año.
4. Textos legales revisados y completados (privacidad, términos, cancelación).
5. Probar con la cuenta de pruebas (sandbox) de la pasarela antes de cobrar dinero real.

## Alcance de esta primera versión

Hecho y probado en modo de prueba: agenda, reserva, flujo de pago simulado, confirmación, validaciones y textos legales en borrador.
Escrito pero SIN probar contra los servicios reales: conexión con Wompi y con Google Calendar.
No incluido todavía: recordatorio al cliente 24 horas antes y aviso propio al despacho (hoy los cubre la invitación de Google), reprogramación por el propio cliente, webhook de la pasarela (si el cliente cierra el navegador tras pagar, la reserva queda pendiente y se resuelve a mano con la referencia).
