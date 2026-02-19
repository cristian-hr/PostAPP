# Post App API

API REST en Go para gestionar posts. Incluye listado, búsqueda por nombre, creación y eliminación.

## Stack

- **Go** 1.24
- **Gin** – HTTP framework
- **GORM** – ORM con PostgreSQL
- **PostgreSQL** (compatible con Neon u otro proveedor)

## Requisitos

- Go 1.24 o superior
- PostgreSQL (local o Neon/cloud)

## Instalación

1. Clonar el repositorio y entrar al directorio:

```bash
cd post-app-api
```

2. Instalar dependencias:

```bash
go mod download
```

3. Crear el archivo de entorno a partir del ejemplo:

```bash
cp .env.example .env
```

4. Editar `.env` y configurar la conexión a la base de datos:

```env
DB_DSN=host=TU_HOST user=TU_USER password=TU_PASSWORD dbname=TU_DB port=5432 sslmode=require
```

Para Neon u otro servicio en la nube, usa el connection string que te proporcionen (con `sslmode=require`).

## Ejecutar

```bash
go run main.go
```

La API quedará disponible en `http://localhost:8080`.

## Build
go build -o server
./server

## Endpoints

| Método | Ruta           | Descripción                    |
|--------|----------------|--------------------------------|
| GET    | `/posts`       | Lista todos los posts         |
| GET    | `/posts/:name` | Lista posts por nombre        |
| POST   | `/posts`       | Crea un post                   |
| DELETE | `/posts/:id`   | Elimina un post por ID         |

### Ejemplos

**Listar posts:**

```bash
curl http://localhost:8080/posts
```

**Crear post:**

```bash
curl -X POST http://localhost:8080/posts \
  -H "Content-Type: application/json" \
  -d '{"name":"Mi post","description":"Descripción del post"}'
```

**Eliminar post:**

```bash
curl -X DELETE http://localhost:8080/posts/1
```

## Estructura del proyecto

```
post-app-api/
├── config/          # Configuración (DB)
├── handlers/        # Controladores HTTP
├── middleware/      # Middleware (errores, etc.)
├── models/          # Modelos de datos
├── repository/      # Capa de acceso a datos
├── service/         # Lógica de negocio
├── pkg/             # Utilidades (logger, apperrors)
├── main.go
├── go.mod
└── .env.example
```

## Licencia

Uso libre según el proyecto.
