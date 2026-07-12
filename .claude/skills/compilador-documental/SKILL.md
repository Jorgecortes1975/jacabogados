---
name: compilador-documental
description: >
  Usa esta skill cuando el usuario quiera compilar, unificar, fusionar o integrar múltiples
  documentos en un único documento Word (.docx) de presentación profesional. Activa esta skill
  ante frases como: "compila estos documentos", "unifica estos archivos", "integra estos documentos
  en uno solo", "crea un compendio", "arma un expediente", "reúne en un solo documento", "haz un
  compilado". También activa si el usuario sube varios archivos (.docx, .pdf) y pide integrarlos.
  El resultado es un .docx elegante con portada, índice hipervinculado, portadillas separadoras
  y numeración correlativa de páginas. SIEMPRE usa esta skill cuando se pidan compilaciones,
  compendios o integración de múltiples documentos en uno solo, aunque el usuario no diga
  explícitamente "skill" o "compilador".
---

# Compilador Documental

Genera un único documento Word (.docx) de presentación profesional a partir de múltiples
archivos fuente (.docx y/o .pdf), con portada alegórica, índice hipervinculado, portadillas
separadoras y paginación correlativa.

## Autor fijo del documento

Toda portada generada lleva siempre:

```
Jorge Ángel Cortés Cartagena, Abogado — T.P. 365.594
```

No preguntar al usuario sobre esto salvo que lo indique expresamente.

---

## Flujo de trabajo

### Fase 1 — Recolección de insumos

1. Identificar los archivos fuente en `/mnt/user-data/uploads/` o los indicados por el usuario.
2. Para cada archivo, extraer:
   - **Título/nombre del documento** (para la portadilla y el índice).
   - **Texto completo** (para insertar el contenido en el compilado).
3. Preguntar al usuario:
   - El **título alegórico** para la portada. Si el usuario no lo sabe, sugerir 3 opciones
     basadas en el contenido de los archivos y pedir que elija.
   - El **orden** en que deben aparecer los documentos (por defecto: orden en que se subieron).
4. No iniciar la compilación hasta tener título confirmado.

### Fase 2 — Extracción de contenido

#### Para archivos .docx

```bash
# Extraer texto plano
pandoc archivo.docx -t plain -o /tmp/texto_doc.txt

# Si necesitas estructura (headings, listas), extraer como markdown
pandoc archivo.docx -t markdown -o /tmp/texto_doc.md
```

#### Para archivos .pdf

```bash
# Verificar primero si el PDF tiene texto extraíble
pdftotext -f 1 -l 1 archivo.pdf - | head -20

# Extraer texto completo preservando layout
pdftotext -layout archivo.pdf /tmp/texto_pdf.txt
```

Si el PDF es escaneado (sin texto extraíble), rasterizar páginas clave:

```bash
pdftoppm -jpeg -r 150 -f 1 -l 3 archivo.pdf /tmp/page
ls /tmp/page-*.jpg
```

Leer las imágenes visualmente para transcribir o resumir el contenido. Advertir al usuario
si la transcripción es parcial.

### Fase 3 — Construcción del documento

Usar la librería `docx` de Node.js:

```bash
npm list -g docx 2>/dev/null || npm install -g docx
```

Generar el script `compilar.js` en `/home/claude/` con los textos extraídos ya integrados,
ejecutarlo y validar el resultado.

---

## Código de referencia — Plantilla base

```javascript
const { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType,
        HeadingLevel, TableOfContents, Header, Footer, PageNumber,
        NumberFormat, BorderStyle, ShadingType, LineRuleType } = require('docx');
const fs = require('fs');

// ── HELPERS ──────────────────────────────────────────────────────────────

function headerConNumero() {
  return new Header({
    children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9A84C", space: 1 } },
      spacing: { after: 120 },
      children: [new TextRun({
        text: "Jorge Ángel Cortés Cartagena — T.P. 365.594",
        font: "Arial", size: 18, color: "888888", italics: true
      })]
    })]
  });
}

function footerConNumero() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: "C9A84C", space: 1 } },
      children: [
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "555555" }),
        new TextRun({ text: " / ", font: "Arial", size: 18, color: "555555" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 18, color: "555555" })
      ]
    })]
  });
}

const propiedadesPagina = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
};

// ── PORTADA ───────────────────────────────────────────────────────────────
// Sección propia sin número de página
const seccionPortada = {
  properties: { page: propiedadesPagina },
  children: [
    new Paragraph({ spacing: { before: 2880 } }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.THICK, size: 12, color: "C9A84C", space: 1 } },
      spacing: { after: 480 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 480, after: 240 },
      children: [new TextRun({
        text: TITULO_ALEGORICO,   // ← reemplazar con la variable del título
        bold: true, size: 52, font: "Arial", color: "1B3A5C"
      })]
    }),
    new Paragraph({
      border: { top: { style: BorderStyle.THICK, size: 12, color: "C9A84C", space: 1 } },
      spacing: { before: 480, after: 960 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 960, after: 120 },
      children: [new TextRun({
        text: "Jorge Ángel Cortés Cartagena, Abogado",
        bold: true, size: 28, font: "Arial", color: "1B3A5C"
      })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [new TextRun({
        text: "T.P. 365.594",
        size: 24, font: "Arial", color: "888888", italics: true
      })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
      children: [new TextRun({
        text: `Medellín, ${new Date().toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' })}`,
        size: 22, font: "Arial", color: "888888"
      })]
    }),
  ]
};

// ── ÍNDICE ────────────────────────────────────────────────────────────────
const seccionIndice = {
  properties: {
    page: {
      ...propiedadesPagina,
      pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL }
    }
  },
  headers: { default: headerConNumero() },
  footers: { default: footerConNumero() },
  children: [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text: "ÍNDICE DE CONTENIDO",
        bold: true, font: "Arial", size: 32, color: "1B3A5C"
      })]
    }),
    new TableOfContents("Tabla de contenido", {
      hyperlink: true,
      headingStyleRange: "1-2",
    }),
    new Paragraph({ children: [new PageBreak()] })
  ]
};

// ── PORTADILLA SEPARADORA ─────────────────────────────────────────────────
function crearPortadilla(nombreDocumento) {
  return {
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: { default: headerConNumero() },
    footers: { default: footerConNumero() },
    children: [
      new Paragraph({ spacing: { before: 4320 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: "— · —",
          size: 32, font: "Arial", color: "C9A84C", bold: true
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 240 },
        children: [new TextRun({
          text: nombreDocumento.toUpperCase(),
          bold: true, size: 44, font: "Arial", color: "1B3A5C"
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 },
        children: [new TextRun({
          text: "— · —",
          size: 32, font: "Arial", color: "C9A84C", bold: true
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          top: { style: BorderStyle.THICK, size: 8, color: "1B3A5C", space: 1 },
          bottom: { style: BorderStyle.THICK, size: 8, color: "1B3A5C", space: 1 }
        },
        spacing: { before: 240, after: 240 },
        children: [new TextRun({ text: "" })]
      }),
      new Paragraph({ children: [new PageBreak()] })
    ]
  };
}

// ── SECCIÓN DE CONTENIDO ──────────────────────────────────────────────────
function crearSeccionContenido(nombreDocumento, lineasTexto) {
  const parrafos = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({
        text: nombreDocumento, font: "Arial", bold: true, color: "1B3A5C"
      })]
    })
  ];

  for (const linea of lineasTexto) {
    const texto = linea.trim();
    if (!texto) {
      parrafos.push(new Paragraph({ spacing: { after: 120 } }));
      continue;
    }
    parrafos.push(new Paragraph({
      spacing: { before: 80, after: 80, line: 360, lineRule: LineRuleType.AUTO },
      children: [new TextRun({ text: texto, font: "Arial", size: 22 })]
    }));
  }

  parrafos.push(new Paragraph({ children: [new PageBreak()] }));

  return {
    properties: { page: propiedadesPagina },
    headers: { default: headerConNumero() },
    footers: { default: footerConNumero() },
    children: parrafos
  };
}

// ── ENSAMBLAJE ────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1B3A5C" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "1B3A5C" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
    ]
  },
  sections: [
    seccionPortada,
    seccionIndice,
    // Para cada documento fuente:
    // crearPortadilla("Nombre del Documento 1"),
    // crearSeccionContenido("Nombre del Documento 1", lineas_doc1),
    // crearPortadilla("Nombre del Documento 2"),
    // crearSeccionContenido("Nombre del Documento 2", lineas_doc2),
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/compilado.docx", buffer);
  console.log("Documento compilado generado.");
});
```

---

## Proceso completo — Pasos de ejecución

```bash
# 1. Instalar dependencia si no está
npm list -g docx 2>/dev/null || npm install -g docx

# 2. Extraer texto de cada archivo fuente (ver Fase 2)

# 3. Generar y ejecutar el script compilador
node /home/claude/compilar.js

# 4. Validar el resultado
python /mnt/skills/public/docx/scripts/office/validate.py /mnt/user-data/outputs/compilado.docx
```

---

## Notas operativas

- **TOC hipervinculado**: El índice requiere actualización al abrir el documento. Indicar al
  usuario: abrir en Word o LibreOffice → `Ctrl+A` → `F9` (o clic derecho → "Actualizar campo").
- **PDFs escaneados**: Si no hay texto extraíble, rasterizar y transcribir manualmente los
  pasajes clave; advertir al usuario sobre la limitación.
- **Documentos extensos**: Integrar siempre el texto completo. No resumir salvo instrucción
  explícita.
- **Título alegórico**: Si el usuario no lo proporciona, generar 3 opciones sugeridas antes
  de proceder.
- **Orden de documentos**: Por defecto, el orden en que fueron subidos. Confirmar si hay dudas.

---

## Dependencias

| Herramienta | Uso | Disponibilidad |
|---|---|---|
| `docx` (npm) | Generar .docx | `npm install -g docx` |
| `pandoc` | Extraer texto de .docx | Pre-instalado |
| `pdftotext` | Extraer texto de .pdf | Pre-instalado (poppler-utils) |
| `pdftoppm` | Rasterizar PDFs escaneados | Pre-instalado (poppler-utils) |
| `validate.py` | Validar .docx generado | Skill docx (`/mnt/skills/public/docx/`) |
