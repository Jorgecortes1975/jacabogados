Regenera el archivo CRM de Excel ejecutando el script principal.

```bash
cd /home/user/jacabogados && python3 generar_crm.py
```

Después de ejecutar, verifica que se hayan creado/actualizado:
- `crm_jaabogados.xlsx` - libro Excel con formato completo
- `crm_jaabogados.csv` - exportación CSV

Si hay errores de módulo faltante, instala con: `pip3 install openpyxl`
