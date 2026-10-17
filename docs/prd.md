# PRD: Página para agendar y pagar una consulta jurídica

Documento de lo que vamos a construir. Está escrito con lo que usted respondió en la entrevista (rondas 1 a 3) y con el resumen que aprobó con "adelante".

Estado: borrador para su visto bueno. Fecha: 17 de octubre de 2026.

## 1. Qué problema resuelve y para quién

### El problema

Hoy, una persona que necesita un abogado y llega al despacho por Google o por redes tiene que escribir o llamar, esperar respuesta, ponerse de acuerdo en una hora y luego buscar cómo pagar. Cada paso es una oportunidad para que se arrepienta o contrate a otro. Además, usted gasta tiempo coordinando horas y cobros a mano.

### Qué queremos lograr

Que una persona pueda reservar y pagar una consulta por su cuenta, a cualquier hora, sin hablar primero con usted. Y que usted solo tenga que aparecer a la videollamada.

### Para quién es

Personas que todavía no son clientes del despacho y llegan por Google o por redes. No es para clientes que ya tiene ni para su equipo interno.

### Qué no cambia

La página es solo la puerta de entrada. El caso, los documentos y el contrato de servicios se manejan después, como siempre, con una hoja de encargo.

## 2. Qué sí entra y qué NO entra

### Sí entra en esta primera versión

1. Una página en español, que se ve bien en celular y en computador.
2. Una sola consulta a la venta: de 45 minutos, por videollamada de Google Meet.
3. Elegir día y hora entre los espacios libres de su Google Calendar, en hora de Colombia.
4. Un formulario corto: nombre completo, correo, celular y una frase sobre el tema.
5. Una casilla obligatoria para autorizar el uso de los datos personales, con los textos legales a un clic.
6. Pago en línea con una pasarela colombiana (tarjeta, PSE y Nequi).
7. Una pantalla de confirmación con la fecha, la hora y el enlace de la videollamada.
8. La cita creada sola en su calendario, con invitación al correo del cliente.
9. Tres textos legales: política de datos personales, términos del servicio y política de cancelación.
10. Un modo de prueba en el que nada se cobra de verdad y nada toca su calendario.

### Reglas del horario acordadas

1. Lunes a viernes.
2. De 8:00 a. m. a 12:00 m. y de 2:00 p. m. a 5:00 p. m.
3. Una hora de descanso entre una consulta y la siguiente.
4. Los festivos se bloquean a mano.
5. Cuando el cliente está pagando, el espacio queda apartado 30 minutos. Si no paga, se libera solo.

### Reglas de cambio y cancelación acordadas

1. El cliente puede cambiar la hora, sin costo, hasta 24 horas antes.
2. Después de ese plazo pierde la cita.
3. Los reembolsos los decide usted caso por caso. No son automáticos.
4. Esta regla debe estar escrita en la página antes del pago.

### Avisos acordados

1. Al cliente, al pagar: confirmación con fecha, hora y enlace de la videollamada.
2. A usted, al pagar: aviso con los datos del cliente.
3. Al cliente, 24 horas antes: recordatorio.

### NO entra en esta primera versión

1. Pagos y reservas de otros tipos de consulta (laboral, civil, contratos). Se agregan después, cada una con su precio.
2. Chat, blog, área privada para clientes, ni subir documentos.
3. Avisos por WhatsApp.
4. Pedir detalles del caso en el formulario. Eso se conversa en la llamada.
5. Cambiar la hora desde la propia página. Por ahora el cliente le escribe al despacho.
6. Devolver dinero de forma automática.
7. Guardar datos de tarjetas. Eso lo hace solo la pasarela de pagos.
8. Mezclar esta página con el sistema jurídico que ya existe en este repositorio. Son proyectos separados.

## 3. Pasos que sigue una persona al usarla

1. La persona llega a la página desde Google o desde una red social.
2. Ve el nombre de la consulta, la duración (45 minutos) y el precio en pesos.
3. Escoge un día. Solo aparecen días con espacio libre.
4. Escoge una hora de ese día.
5. Escribe su nombre completo, su correo, su celular y el tema en una frase.
6. Marca la casilla de autorización de datos. Si no la marca, no puede seguir.
7. Oprime "Continuar al pago". El espacio queda apartado para ella por 30 minutos.
8. Paga en la pantalla de la pasarela, con tarjeta, PSE o Nequi.
9. Vuelve a la página y ve la confirmación con la fecha, la hora y el enlace de la videollamada.
10. Recibe en su correo la invitación del calendario con el mismo enlace.
11. El día antes recibe un recordatorio.
12. A la hora acordada entra a la videollamada y usted la atiende.

### Qué pasa cuando algo sale diferente

1. Si el espacio que escogió se ocupó mientras llenaba el formulario, la página se lo dice y le pide escoger otro.
2. Si el pago es rechazado, la página le dice que no se cobró nada y que puede intentar de nuevo.
3. Si el pago queda en proceso, la página le pide esperar y vuelve a revisar.
4. Si paga pero el espacio ya se había liberado, la página le muestra una referencia y le pide escribir al despacho. Usted lo resuelve a mano.
5. Si no paga, el espacio se libera solo pasados 30 minutos.

## 4. Qué cuenta como terminado

Cada punto se puede comprobar abriendo la página. Se prueban primero en modo de prueba y los de pago real también con la cuenta de pruebas de la pasarela. Nada se da por terminado hasta que se haya hecho esa comprobación.

### La página

1. Se abre sin errores en celular y en computador, y se lee sin que el texto se corte.
2. Muestra el nombre de la consulta, "45 minutos por videollamada" y el precio definitivo que usted fije.
3. Solo ofrece lunes a viernes, dentro de las dos franjas, sin festivos bloqueados y sin horas que queden a menos de 24 horas.
4. Entre dos espacios del mismo día hay al menos una hora de descanso.

### El formulario

5. No deja avanzar si falta el nombre, el correo, el celular o el tema, y dice cuál falta.
6. No deja avanzar sin la casilla de autorización marcada.
7. Los tres enlaces legales (datos, términos, cancelación) abren y se leen completos.
8. Dos personas no pueden reservar la misma hora: la segunda recibe un aviso y escoge otra.

### El pago

9. Con un pago aprobado, la persona ve la confirmación con fecha, hora y enlace.
10. Con un pago rechazado, la página dice que no se cobró y no se crea cita.
11. Si el cliente no paga, el espacio vuelve a aparecer disponible a los 30 minutos.
12. El valor cobrado es exactamente el que muestra la página.

### Su calendario y los avisos

13. Cada pago aprobado crea una cita en su Google Calendar, con el nombre, el celular y el tema del cliente.
14. El cliente recibe la invitación en su correo, con el enlace de Meet que abre.
15. El cliente recibe un recordatorio 24 horas antes.
16. Usted recibe un aviso cuando alguien paga.

### Los textos legales y el modo de prueba

17. Los tres textos legales no tienen campos vacíos entre corchetes y tienen su aprobación por escrito.
18. En modo de prueba se ve un aviso visible y no se cobra dinero ni se crea ninguna cita en su calendario real.
19. Para publicar se apaga el modo de prueba de forma expresa. Mientras no se apague, no se cobra.

### Estado hoy frente a esta lista

Ya construido y probado en modo de prueba: puntos 1, 3, 4, 5, 6, 7 (con textos en borrador), 8, 9, 10, 11 y 18.
Escrito pero sin probar con los servicios reales: los puntos 9 al 14 con Wompi y con Google Calendar de verdad, y la liberación del cupo en Google.
Todavía no construido como aviso propio: puntos 15 y 16. Hoy los cubre la invitación de Google Calendar.
Pendiente de usted: puntos 2, 12 y 17.

## 5. Preguntas que quedaron abiertas

### Las que solo usted puede responder

1. Nombre definitivo de la consulta y precio en pesos. Hoy aparece $150.000 como precio provisional.
2. ¿Qué pasarela va a usar? En la entrevista dijimos Wompi o Mercado Pago. Lo construido está pensado para Wompi. Necesito que la cuenta esté aprobada para probar con dinero de mentira.
3. ¿Me autoriza a conectar el Google Calendar de jorgeacortesc38@gmail.com? Sin su autorización expresa no lo toco. ¿O prefiere otra cuenta?
4. ¿Tiene dominio (por ejemplo jacabogados.com), logo y colores? Si no, queda una apariencia sencilla que usted podrá cambiar.
5. ¿Quién paga el dominio y el alojamiento, y a nombre de quién quedan? Recomendación: a nombre suyo.
6. Los datos del despacho para los textos legales: NIT, ciudad y dirección, correo y teléfono de contacto.
7. ¿Cuánto tiempo conserva el despacho los datos de quien agenda? No lo decidimos.
8. La lista de festivos que quiere bloquear este año.

### Las que debe revisar usted como abogado

9. Los tres textos legales están en borrador. Mencionan la Ley 1581 de 2012 (datos personales) y la Ley 1480 de 2011 (consumidor). No he verificado su vigencia ni su texto en fuente oficial. Falta decidir cómo se trata el derecho de retracto en una consulta que se paga en línea.
10. ¿El despacho debe registrar esta base de datos ante la Superintendencia de Industria y Comercio? Sin verificar.
11. La página usa servicios de terceros que pueden guardar datos fuera de Colombia (Google, la pasarela, el alojamiento). Hay que revisar si eso exige algo adicional.
12. ¿Qué incluye exactamente la consulta de 45 minutos y qué no? El borrador de términos lo deja entre corchetes.

### Decisiones mías que usted debe confirmar o cambiar

13. Supuesto: solo se puede reservar con 24 horas o más de antelación.
14. Supuesto: se ofrecen espacios hasta 30 días hacia adelante.
15. La hora de descanso entre consultas deja solo cuatro espacios por día (dos en la mañana y dos en la tarde). ¿Es lo que quiere, o prefiere menos descanso para ofrecer más espacios?
16. Si alguien paga y no vuelve a la página, la reserva queda pendiente hasta que usted la resuelva a mano. Se puede automatizar con un aviso de la pasarela. ¿Lo quiere en la primera versión?
17. El recordatorio al cliente y el aviso a usted hoy salen de la invitación de Google Calendar. ¿Alcanza, o quiere correos propios del despacho?
18. ¿El cliente puede cambiar la hora solo desde la página, o basta con escribirle al despacho?

### Un tema técnico que usted debe decidir

19. Su cuenta de Vercel ya tiene un proyecto conectado a este repositorio y publica la raíz, no la carpeta de la agenda. Para publicar la agenda hay que cambiar un ajuste en Vercel. Y mientras tanto no conviene compartir la vista previa que genera, porque el repositorio contiene su sistema jurídico y el archivo de prospectos.
