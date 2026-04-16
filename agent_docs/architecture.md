# GridPulse — Decisiones de Arquitectura

## Tipo de Aplicación: SPA (Single Page Application)

**Decisión:** GridPulse es una SPA pura, no un servidor con SSR.

**Por qué:**
- Los datos son dinámicos y en tiempo real — el SSR de Next.js no agrega valor aquí
- La app corre 100% en el browser del usuario, sin servidor propio
- Simplifica el deploy (archivos estáticos en Vercel)
- Reduce costos a cero en hosting

**Consecuencia:** El SEO es limitado, pero GridPulse es una herramienta para fans
activos, no un blog que necesita indexarse en Google.

---

## Gestión de Estado: Sin Redux, solo TanStack Query + useState

**Decisión:** No usar Redux, Zustand ni Context API global para datos remotos.

**Por qué:**
- TanStack Query maneja todo el estado del servidor (cache, loading, error, refetch)
- El único estado local real son filtros UI (año seleccionado, piloto activo, etc.)
- useState local en el componente es suficiente para eso
- Redux agrega complejidad que no necesitamos en este proyecto

**Regla:** Si necesitas compartir estado entre componentes distantes,
primero evalúa si TanStack Query ya lo resuelve con el mismo queryKey.

---

## Routing: React Router con rutas declarativas

**Rutas definidas:**

```
/                  → HomePage      (resumen: última carrera, standings, próxima carrera)
/live              → LivePage      (timing en vivo — solo activo durante sesiones)
/standings         → StandingsPage (pilotos y constructores, selector de temporada)
/calendar          → CalendarPage  (calendario de carreras del año actual)
/results/:year/:round → ResultsPage (resultado detallado de una carrera)
/news              → NewsPage      (feed de noticias F1)
/history           → HistoryPage   (explorador de datos históricos)
```

---

## Polling y Tiempo Real: Solo en LivePage

**Decisión:** El polling agresivo (refetch cada 5s) solo ocurre en LivePage
y solo cuando hay una sesión activa de F1.

**Por qué:**
- Las APIs gratuitas tienen rate limits — no podemos pollear en toda la app
- Los datos de clasificación y resultados solo cambian en fin de semana de carrera
- El polling innecesario consume batería y datos del usuario

**Implementación:**
```
1. Al cargar LivePage, verificar si hay sesión activa via OpenF1 /sessions
2. Si hay sesión activa → activar polling de 5 segundos
3. Si no hay sesión → mostrar resultados de la última carrera, sin polling
4. Al salir de LivePage → detener polling automáticamente (TanStack Query lo maneja)
```

---

## Manejo de Errores: Niveles

```
Nivel 1 — Componente:
  Cada sección con datos tiene su propio estado de error
  Muestra mensaje amigable en español, nunca stack traces

Nivel 2 — Query:
  TanStack Query reintenta 3 veces antes de marcar como error
  En caso de error, muestra datos del cache si existen

Nivel 3 — App:
  ErrorBoundary global captura errores de render inesperados
  Muestra pantalla de error genérica con botón "Reintentar"
```

---

## Diseño Visual: Dark Mode como default

**Decisión:** La app es dark mode por defecto, con posibilidad de light mode futuro.

**Por qué:**
- El público de F1 consume contenido frecuentemente de noche (carreras en Europa/Asia)
- Los colores vibrantes de los equipos resaltan más sobre fondos oscuros
- Es el estándar de apps de deportes modernas

**Paleta base:**
```
Background:     #0a0a0a  (casi negro)
Surface:        #141414  (cards, panels)
Border:         #242424  (separadores)
Text primary:   #ffffff
Text secondary: #a1a1aa  (zinc-400)
Accent:         #e10600  (rojo F1 oficial)
```

---

## Internacionalización: Inglés como idioma base de la UI

**Decisión:** La interfaz de usuario está en inglés. Los comentarios del código en español.

**Por qué:**
- GridPulse apunta a una audiencia global — el inglés es el idioma universal de F1
- Los datos de las APIs ya vienen en inglés (nombres de pilotos, circuitos, etc.)
- Evita inconsistencias de mezclar idiomas en la UI

**Futuro:** Si se agrega i18n, usar react-i18next. No preparar la arquitectura para
esto ahora — YAGNI (You Aren't Gonna Need It).

---

## Performance: Lazy loading por ruta

**Decisión:** Cada página se carga de forma lazy (code splitting por ruta).

```typescript
// En App.tsx
const LivePage = lazy(() => import('@/pages/LivePage'))
const StandingsPage = lazy(() => import('@/pages/StandingsPage'))
// etc.
```

**Por qué:** El bundle inicial carga más rápido. El usuario solo descarga el
código de LivePage cuando navega a /live, no al entrar a la app.

---

## Resumen de Decisiones Clave

| Decisión | Elegimos | Descartamos | Razón |
|----------|----------|-------------|-------|
| App type | SPA | SSR/Next.js | Datos en tiempo real, sin necesidad de SEO |
| Estado | TanStack Query + useState | Redux/Zustand | Suficiente para este caso |
| Styling | Tailwind CSS | CSS Modules | Más rápido de desarrollar, sin experiencia previa del usuario |
| APIs | Gratuitas (Jolpica, OpenF1) | APIs de pago | Proyecto exploratorio sin presupuesto |
| i18n | Solo inglés por ahora | react-i18next | YAGNI — no complicar hasta que sea necesario |
| Dark/Light | Dark mode default | Light mode default | Audiencia global de F1, contenido nocturno |
