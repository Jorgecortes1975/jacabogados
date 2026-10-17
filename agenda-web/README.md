# Agenda web: consulta jurídica con pago en línea

Página para que un cliente nuevo escoja día y hora, deje sus datos y pague una consulta por videollamada.
Proyecto independiente del sistema jurídico de este repositorio. No usa dependencias externas (solo Node 20 o superior).

## Probar en su computador (modo de prueba, sin cobrar)

    cd agenda-web
    cp .env.example .env
    npm run dev          # abre http://localhost:3000
    npm test

## Cómo funciona

1. La página consulta `/api/disponibilidad`: genera los cupos del horario (lunes a viernes, 8 a 12 y 2 a 5, hora de Colombia, 45 minutos más 15 de descanso: siete espacios por día) y quita los ocupados.
2. Al enviar el formulario, `/api/reservar` valida los datos, retiene el cupo 30 minutos como evento provisional "PENDIENTE DE PAGO" y envía al cliente a la pasarela.
3. Al volver, `/api/confirmar` (o el aviso automático de la pasarela en `/api/webhook`) le pregunta a la pasarela si el pago fue aprobado (no confía en el navegador). Si lo fue, confirma el evento, crea el enlace de Meet y Google envía la invitación al correo del cliente.

No hay base de datos: el estado vive en su Google Calendar.

La guía paso a paso para el titular está en `docs/guia-puesta-en-marcha.md`.

## Para pasar a producción (MODO_PRUEBA=0)

1. Cuenta aprobada en la pasarela y llaves en `.env` (nunca en el repositorio).
2. Credenciales de Google Calendar (cliente OAuth) y el token de actualización de la cuenta del despacho, que entrega `npm run google-token`.
3. Nombre y precio definitivos de la consulta, y festivos del año.
4. Textos legales revisados y completados (privacidad, términos, cancelación).
5. Registrar en el panel de Wompi la dirección del aviso automático: `SITIO_URL/api/webhook`.
6. Probar con la cuenta de pruebas (sandbox) de la pasarela antes de cobrar dinero real.

## Alcance de esta primera versión

Hecho y probado en modo de prueba: agenda, reserva, flujo de pago simulado, confirmación (por la página y por el aviso de la pasarela), liberación de cupos, validaciones y textos legales en borrador.
Escrito pero SIN probar contra los servicios reales: Wompi, Google Calendar y la forma del aviso automático. La documentación no estuvo accesible, así que esos puntos son supuestos.
Decisión del titular: el cupo se aparta 30 minutos mientras se paga. Un pago por PSE puede tardar más; si pasa, el cliente verá "necesitamos revisar su reserva" y el despacho lo resuelve a mano con la referencia.
No incluido: correos propios del despacho (el recordatorio garantizado al cliente), cambio de hora desde la página, límite de solicitudes contra abuso.
