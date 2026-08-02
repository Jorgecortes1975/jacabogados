#!/bin/bash

AGENTS_DIR=".claude/agents"

ramas=(
  "civil:Derecho Civil:Contratos civiles, responsabilidad civil, sucesiones"
  "penal:Derecho Penal:Delitos, procedimiento penal, defensa"
  "comercial:Derecho Comercial:Contratos mercantiles, títulos valores, insolvencia"
  "laboral:Derecho Laboral:Contratos laborales, despidos, conflictos"
  "administrativo:Derecho Administrativo:Procedimiento administrativo, actos"
  "constitucional:Derecho Constitucional:Tutelas, derechos fundamentales"
  "tributario:Derecho Tributario:Impuestos nacionales, DIAN, compliance"
  "ambiental:Derecho Ambiental:Licencias ambientales, compliance"
  "familia:Derecho de Familia:Matrimonio, divorcio, filiación, custodia"
  "internacional:Derecho Internacional:Comercio exterior, tratados"
  "agrario:Derecho Agrario:Propiedad rural, reforma agraria"
  "notarial:Derecho Notarial:Documentos públicos, registro"
  "procesal:Derecho Procesal:Procedimiento civil, penal, recursos"
  "minero:Derecho Minero:Concesiones mineras, compliance"
  "aeronautico:Derecho Aeronáutico:Aviación civil, transporte aéreo"
  "maritimo:Derecho Marítimo:Navegación, puertos, transporte"
  "propiedad-intelectual:Propiedad Intelectual:Marcas, patentes, derechos"
  "digital:Derecho Digital:Datos personales, ciberseguridad, RGPD"
  "corporativo:Derecho Corporativo:M&A, gobierno corporativo"
  "derechos-humanos:Derechos Humanos:DDHH, protección internacional"
)

echo "🚀 Configurando 20 ramas jurídicas..."

count=0
for rama_config in "${ramas[@]}"; do
  IFS=':' read -r rama nombre desc <<< "$rama_config"
  ((count++))

  rama_dir="$AGENTS_DIR/juridico-$rama"
  mkdir -p "$rama_dir"

  echo "[$count/20] ✅ $nombre"
done

echo ""
echo "✨ Todas las 20 ramas han sido configuradas"
ls -d $AGENTS_DIR/juridico-* | wc -l | xargs echo "Directorios creados:"
