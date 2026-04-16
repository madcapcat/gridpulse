# GridPulse — APIs de Datos

## 1. Jolpica F1 API (datos de temporada e histórico)

**Base URL:** `https://api.jolpi.ca/ergast/f1`
**Auth:** Sin API key
**Rate limit:** 4 requests/segundo, 200 requests/hora
**Formato:** JSON
**Cobertura:** 1950 — presente

### Endpoints principales

```
# Clasificación de pilotos — temporada actual
GET /current/driverStandings.json

# Clasificación de constructores — temporada actual
GET /current/constructorStandings.json

# Calendario de carreras — temporada actual
GET /current.json

# Resultados de la última carrera
GET /current/last/results.json

# Resultados de clasificación (qualifying) de la última carrera
GET /current/last/qualifying.json

# Resultados de una carrera específica
GET /{year}/{round}/results.json

# Todas las carreras de una temporada
GET /{year}.json

# Info de un piloto específico
GET /drivers/{driverId}.json

# Vueltas rápidas de una carrera
GET /{year}/{round}/fastest/1/results.json

# Historial de campeones
GET /driverStandings/1.json?limit=100
```

### Ejemplo de respuesta — Driver Standings
```json
{
  "MRData": {
    "StandingsTable": {
      "StandingsLists": [{
        "DriverStandings": [{
          "position": "1",
          "points": "136",
          "wins": "4",
          "Driver": {
            "driverId": "verstappen",
            "givenName": "Max",
            "familyName": "Verstappen",
            "nationality": "Dutch"
          },
          "Constructors": [{ "name": "Red Bull" }]
        }]
      }]
    }
  }
}
```

---

## 2. OpenF1 API (timing en vivo durante carrera)

**Base URL:** `https://api.openf1.org/v1`
**Auth:** Sin API key
**Rate limit:** Sin límite documentado — usar con moderación
**Formato:** JSON
**Disponibilidad:** Solo durante sesiones activas (FP1, FP2, FP3, Quali, Carrera)

### Endpoints principales

```
# Posiciones en tiempo real
GET /position?session_key=latest

# Datos del auto (velocidad, DRS, etc.)
GET /car_data?session_key=latest&driver_number=1

# Intervalos entre pilotos
GET /intervals?session_key=latest

# Información de pilas de trabajo (pit stops)
GET /pit?session_key=latest

# Mensajes de radio del equipo
GET /team_radio?session_key=latest

# Datos de vuelta por piloto
GET /laps?session_key=latest&driver_number=1

# Clima en el circuito
GET /weather?session_key=latest

# Sesiones disponibles
GET /sessions?year=2025

# Pilotos de una sesión
GET /drivers?session_key=latest
```

### Estrategia de polling para tiempo real
```
- Durante sesión activa: refetch cada 5 segundos (TanStack Query refetchInterval)
- Entre sesiones: no hacer polling — mostrar datos de la última carrera
- Detectar si hay sesión activa: GET /sessions?year=2025 y verificar date_start/date_end
```

### Ejemplo de respuesta — Position
```json
[
  {
    "date": "2025-05-25T14:32:15.123Z",
    "driver_number": 1,
    "meeting_key": 1234,
    "position": 1,
    "session_key": 9999
  }
]
```

---

## 3. GNews API (noticias de F1)

**Base URL:** `https://gnews.io/api/v4`
**Auth:** API key — variable de entorno `VITE_GNEWS_API_KEY`
**Rate limit:** 100 requests/día en plan gratuito
**Formato:** JSON

### Endpoints principales

```
# Noticias de F1 en tiempo real
GET /search?q=Formula+1&lang=en&token={API_KEY}

# Noticias con múltiples términos
GET /search?q=Formula+1+OR+F1+OR+Grand+Prix&lang=en&max=10&token={API_KEY}

# Noticias en español
GET /search?q=Formula+1&lang=es&token={API_KEY}
```

### Estrategia de uso responsable (100 req/día)
```
- Cache agresivo: staleTime de 15 minutos en TanStack Query
- Refetch manual solo cuando el usuario lo pida (botón refresh)
- NO hacer polling automático de noticias
- Guardar última respuesta en localStorage como fallback
```

### Ejemplo de respuesta
```json
{
  "articles": [{
    "title": "Max Verstappen wins Monaco Grand Prix",
    "description": "...",
    "url": "https://...",
    "image": "https://...",
    "publishedAt": "2025-05-25T16:00:00Z",
    "source": { "name": "BBC Sport" }
  }]
}
```

---

## 4. RSS Feeds (noticias complementarias, sin límite)

Usar como complemento o fallback de GNews. Sin API key. Sin límite.

| Fuente | URL del Feed |
|--------|-------------|
| Autosport | `https://www.autosport.com/rss/f1/news` |
| BBC Sport F1 | `https://feeds.bbci.co.uk/sport/formula1/rss.xml` |
| The Race | `https://the-race.com/feed/` |
| Motorsport.com | `https://www.motorsport.com/rss/f1/news/` |

### Parseo de RSS
Usar `rss2json` API gratuita para convertir RSS a JSON:
```
GET https://api.rss2json.com/v1/api.json?rss_url={ENCODED_RSS_URL}
```

---

## Variables de Entorno

Archivo `.env.local` (nunca commitear, está en .gitignore):
```
VITE_GNEWS_API_KEY=tu_key_aqui
```

Archivo `.env.example` (sí commitear, sin valores reales):
```
VITE_GNEWS_API_KEY=
```

---

## Manejo de Errores de API

```typescript
// Patrón estándar para todos los servicios
// Si una API falla, mostrar datos en caché si existen
// Si no hay caché, mostrar estado de error con mensaje amigable en español
// Nunca mostrar errores técnicos al usuario final
```
