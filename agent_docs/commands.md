# GridPulse — Comandos de Desarrollo

## Comandos diarios

```bash
# Iniciar servidor de desarrollo (abre en http://localhost:5173)
pnpm dev

# Build de producción (genera carpeta dist/)
pnpm build

# Previsualizar el build de producción localmente
pnpm preview
```

## Calidad de código

```bash
# Verificar tipos TypeScript (sin generar archivos)
pnpm type-check

# Ejecutar ESLint
pnpm lint

# ESLint con corrección automática
pnpm lint:fix

# Formatear código con Prettier
pnpm format

# Verificar formato sin modificar archivos
pnpm format:check
```

## Testing

```bash
# Ejecutar todos los tests
pnpm test

# Tests en modo watch (re-ejecuta al guardar)
pnpm test:watch

# Tests con reporte de cobertura
pnpm test:coverage
```

## Instalación de dependencias

```bash
# Instalar todas las dependencias del proyecto
pnpm install

# Agregar una dependencia de producción
pnpm add nombre-paquete

# Agregar una dependencia de desarrollo
pnpm add -D nombre-paquete

# Actualizar dependencias
pnpm update
```

## Comandos combinados (pre-push checklist)

```bash
# Verificación completa antes de hacer commit
pnpm type-check && pnpm lint && pnpm test

# Build completo para verificar que no hay errores
pnpm type-check && pnpm build
```

## Variables de entorno

```bash
# El archivo .env.local contiene las keys reales (nunca se commitea)
# Copiar .env.example como base
cp .env.example .env.local
# Luego editar .env.local y agregar VITE_GNEWS_API_KEY=tu_key
```

## Notas importantes

- Todos los comandos se ejecutan desde la raíz del proyecto
- El dev server recarga automáticamente al guardar archivos (HMR)
- TypeScript en modo strict — errores de tipos bloquean el build
- ESLint está configurado para fallar en warnings (zero tolerance)
