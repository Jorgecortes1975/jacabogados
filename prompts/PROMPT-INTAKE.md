# PROMPT — INTAKE RÁPIDO

Úsalo para recopilar información de un cliente nuevo en Claude.

---

## CÓPIALO Y PÉGALO EN CLAUDE

```
Voy a darte información de una empresa que quiere servicios de Seguridad Social 
y Derecho Laboral. Lee CLAUDE.md primero (está en el repositorio jacabogados).

Luego, contesta estas 7 preguntas una a una. Yo voy a responder cada una.

1. **¿Nombre de empresa, NIT, sector y ubicación?**
   (Ejemplo: "Telepatía, 123456789-0, IA/Tecnología, Medellín")

2. **¿Datos del decisor: nombre, cargo, email, teléfono?**

3. **¿Cuántos empleados tiene? (totales, formales, informales, contratistas)**

4. **¿Sistemas de seguridad social actuales: tiene EPS, AFP, ARL, Caja de Compensación?**
   (Solo sí/no de cada uno, o "no sé")

5. **¿Qué servicios necesita? (marca múltiples si aplica)**
   - Auditoría de cumplimiento
   - Formalización de empleados
   - Reforma de nómina
   - Asesoría en cambios laborales
   - Conflicto laboral abierto
   - Capacitación
   - Otro

6. **¿Cuál es la urgencia?**
   - Inmediato (< 1 semana)
   - Corto plazo (1-2 semanas)
   - Mediano plazo (1-2 meses)

7. **¿Hay algún caso abierto, inspección, o empleados sin afiliación?**

Cuando hayas respondido todo, yo genero el archivo INTAKE en formato Markdown 
listo para guardar en la carpeta del cliente.
```

---

## DESPUÉS DE LA RESPUESTA

Claude generará un archivo `01-INTAKE.md` que puedas copiar/pegar directamente a Google Drive o al repositorio.

---

**Uso**: Úsalo cada vez que llegue un cliente nuevo para recopilar datos de manera estructurada.
