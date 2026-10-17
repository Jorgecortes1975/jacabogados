# Guía para poner en marcha la agenda web

Esta guía es para usted, no para un programador. Cada paso dice quién lo hace y qué debe quedar al final.

Aviso importante: no pude abrir la documentación de Vercel, Wompi ni Google desde mi entorno. Los pasos están escritos de memoria, y los nombres exactos de los menús pueden haber cambiado. Donde dice "a confirmar en pantalla", busque la opción que más se parezca y no se guíe por el nombre exacto.

## Regla de seguridad que no tiene excepciones

Las llaves y claves de esta guía (llaves de Wompi, clave de Google, token) son como la clave de su banco.

1. No me las escriba en el chat, ni en un correo, ni en el repositorio.
2. Se pegan solo en dos lugares: el archivo `.env` de su computador y las variables de entorno de Vercel.
3. Si alguna se expone por error, se anula en su servicio de origen y se crea otra.

## Orden recomendado

1. Parte A: Vercel (hoy, 10 minutos). Es lo más urgente.
2. Parte B: decisiones y datos del despacho (cuando pueda).
3. Parte C: cuenta de Google (1 hora, hágala en un solo rato).
4. Parte D: cuenta de Wompi (puede tardar días por la verificación).
5. Parte E: prueba final con dinero de mentira.
6. Parte F: pasar a producción.

## Parte A: Vercel (hoy)

Problema: el proyecto de Vercel `jacabogados` publica la raíz del repositorio, que contiene su sistema jurídico y el archivo de prospectos, y no la agenda.

1. Entre a vercel.com con su cuenta y abra el proyecto `jacabogados`.
2. Vaya a Settings, y dentro de General busque "Root Directory". (A confirmar en pantalla.)
3. Escriba `agenda-web` y guarde.
4. En Settings, busque la protección de despliegues ("Deployment Protection" o "Vercel Authentication") y confirme que las vistas previas pidan inicio de sesión. (A confirmar en pantalla.) Así nadie sin cuenta ve las vistas previas.
5. Compruebe: después del cambio, la próxima vista previa que se genere debe mostrar la página de agenda en modo de prueba.

Qué debe quedar: la vista previa muestra la agenda y ya no el contenido del repositorio completo.

## Parte B: decisiones y datos del despacho

Escríbamelos en el chat. Estos datos no son claves, puede compartirlos.

1. Nombre definitivo de la consulta y precio en pesos, como número entero sin puntos ni comas (ejemplo: 150000). Si el precio se escribe con punto, la página se negará a arrancar en producción. Es a propósito, porque `150.000` se leería como 150 pesos.
2. NIT, ciudad y dirección, correo y teléfono del despacho.
3. Festivos que quiere bloquear este año.
4. Plazo de conservación de los datos de quien agenda.
5. Si tiene dominio, su nombre. Si no, quién lo compra y a nombre de quién. Recomendación: a nombre suyo.
6. ¿Necesita que el cliente reciba un recordatorio seguro 24 horas antes desde la primera versión? Hoy no está garantizado.

Además, revise como abogado los tres textos legales en `agenda-web/public/` (`privacidad.html`, `terminos.html`, `cancelacion.html`). Tienen una franja roja de borrador y campos entre corchetes que hay que completar.

## Parte C: cuenta de Google (calendario y Meet)

Objetivo: obtener tres valores: un identificador de cliente, una clave de cliente y un token. Con ellos la página lee sus horas ocupadas y crea las citas.

Use la cuenta de Google donde quiere ver las citas. Antes de empezar, confírmeme por escrito cuál es.

1. Entre a console.cloud.google.com con esa cuenta.
2. Cree un proyecto nuevo y póngale un nombre como "Agenda JAC".
3. En el buscador del panel, escriba "Google Calendar API" y oprima "Habilitar". (A confirmar en pantalla.)
4. Busque la pantalla de consentimiento ("OAuth consent screen" o "Google Auth Platform"). Elija tipo "Externo". Ponga el nombre de la aplicación y su correo. (A confirmar en pantalla.)
5. Agregue su propio correo como usuario de prueba, si la pantalla lo pide.
6. Cree credenciales de tipo "ID de cliente de OAuth" y elija el tipo "Aplicación de escritorio". (A confirmar en pantalla.)
7. Google le muestra el identificador de cliente y la clave de cliente. Cópielos al archivo `.env` de su computador:

    GOOGLE_CLIENT_ID=lo-que-le-muestre-google
    GOOGLE_CLIENT_SECRET=lo-que-le-muestre-google

8. En su computador, dentro de la carpeta `agenda-web`, ejecute `npm run google-token`.
9. Abra en su navegador la dirección larga que aparece en la terminal e inicie sesión. Es normal que Google diga que la aplicación "no está verificada": es su propia aplicación. Siga con "Continuar" y acepte los permisos de calendario.
10. Cuando termine, la terminal imprime una línea que empieza por `GOOGLE_REFRESH_TOKEN=`. Cópiela completa a su `.env`.

Advertencia que debe saber, a confirmar en pantalla: según recuerdo, cuando una aplicación externa se queda en estado "En pruebas", Google hace que el token venza a los 7 días. Para que no venza, en la pantalla de consentimiento hay una opción de pasar la aplicación a "En producción". Para uso propio no requiere que Google la revise, aunque seguirá mostrando el aviso de "no verificada". Hágalo antes de pasar a producción. Si en algún momento la agenda deja de mostrar horas, esta es la primera causa a revisar.

Qué debe quedar: tres líneas de Google en su `.env`.

## Parte D: cuenta de Wompi

Objetivo: abrir la cuenta y obtener las llaves de pruebas primero, y las de producción después.

1. Entre al sitio de Wompi y abra una cuenta de comercio. Pedirán datos y documentos del despacho. La aprobación puede tardar varios días.
2. Mientras tanto, pregunte si le habilitan las llaves de pruebas ("sandbox"), que normalmente no exigen que la cuenta esté aprobada. (A confirmar.)
3. En el panel de desarrolladores busque estas llaves y cópielas al `.env`:

    WOMPI_PUBLIC_KEY=la llave pública
    WOMPI_INTEGRITY_SECRET=el secreto de integridad
    WOMPI_API_URL=https://sandbox.wompi.co/v1

4. Más adelante, para producción, use las llaves de producción y `WOMPI_API_URL=https://production.wompi.co/v1`.
5. En el mismo panel, registre la dirección del aviso automático de pagos: la dirección pública de la página seguida de `/api/webhook`. Ejemplo: `https://www.jacabogados.com/api/webhook`.
6. Confirme con Wompi o en su documentación los medios de pago que aceptan (tarjeta, PSE, Nequi) y las comisiones. Esto último no lo pude verificar.

Qué debe quedar: tres líneas de Wompi en su `.env` y el aviso automático registrado.

## Parte E: prueba final con dinero de mentira

Con todo lo anterior listo, esto lo hacemos juntos.

1. Su `.env` queda con `MODO_PRUEBA=0`, las llaves de pruebas de Wompi, las tres líneas de Google, `SITIO_URL`, el precio y el nombre.
2. Arrancamos la página en su computador y yo le indico cómo pagar con una tarjeta de prueba de Wompi (la entrega Wompi).
3. Comprobamos esto, una por una:
    a. Se ve la agenda con las horas libres de su calendario real.
    b. Al reservar, aparece una cita provisional "PENDIENTE DE PAGO" en su calendario.
    c. Con pago aprobado, la cita queda confirmada, con enlace de Meet, y el cliente recibe la invitación.
    d. Con pago rechazado, no se crea ninguna cita y la hora se libera a los 30 minutos.
    e. Si cierra la ventana justo después de pagar, la cita se confirma sola por el aviso automático.
4. Anotamos qué no funcionó. Aquí se comprueban los supuestos que hoy están sin verificar sobre Wompi y Google.

## Parte F: pasar a producción

1. Textos legales aprobados por usted, sin campos vacíos.
2. Llaves de producción de Wompi y su cuenta aprobada.
3. Las mismas variables del `.env` cargadas en Vercel (Settings, Environment Variables), no en el repositorio.
4. Dominio apuntando a la página.
5. Una compra real de prueba por el valor mínimo posible, hecha por usted, y su devolución desde el panel de Wompi.
6. Hasta ese punto, la página no cobra: en producción se activa solo con `MODO_PRUEBA=0`.

## Lista de valores del archivo .env

    MODO_PRUEBA            1 para pruebas sin cobrar, 0 para cobrar de verdad
    SITIO_URL              dirección pública de la página, sin barra al final
    CONSULTA_NOMBRE        nombre de la consulta
    CONSULTA_PRECIO_COP    precio en pesos, entero, sin puntos
    FESTIVOS               fechas AAAA-MM-DD separadas por coma
    WOMPI_API_URL          sandbox o producción de Wompi
    WOMPI_PUBLIC_KEY       llave pública de Wompi
    WOMPI_INTEGRITY_SECRET secreto de integridad de Wompi
    GOOGLE_CLIENT_ID       de la Parte C
    GOOGLE_CLIENT_SECRET   de la Parte C
    GOOGLE_REFRESH_TOKEN   lo entrega `npm run google-token`
    GOOGLE_CALENDAR_ID     primary, salvo que use otro calendario
