# Trailerflix 

**Trailerflix** es una API que permite gestionar contenidos de una plataforma de streaming. El proyecto está desarrollado con **Node.js**, **Express**, **MySQL** y **Sequelize**.

## Requisitos

- Node.js 
- MySQL 
- Sequelize

## Dependencias

- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.
- **express**: Framework para manejar el servidor y las rutas.
- **mysql2**: Cliente de MySQL para conectar la base de datos con Node.js.
- **sequelize**: ORM para manejar la interacción con la base de datos.
- **nodemon**: Herramienta para reiniciar automáticamente el servidor en modo desarrollo.

## Instalación

1. **Clonar este repositorio:**

    ```bash
    git clone https://github.com/cocomeza/Trailerflix_API_streaming.git
    ```

2. **Instalar dependencias:**

    Navega a la carpeta del proyecto y ejecuta:

    ```bash
    npm install
    ```

3. **Configurar variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto y agrega tu configuración de MySQL:

    ```
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    DB_DIALECT=mysql
    ```

4. **Iniciar el servidor:**

    En modo producción:

    ```bash
    npm start
    ```

    En modo desarrollo con nodemon:

    ```bash
    npm run dev
    ```

## Rutas de la API

### 1. **Obtener todo el contenido** (GET)

- **URL**: `/contenido`
- **Descripción**: Retorna todos los contenidos disponibles en la plataforma.

**Ejemplo en Postman:**

 Obtener contenido (GET)

 http://localhost:3000/contenidos


 Obtener contenido por su ID (GET)

 
GET http://localhost:3000/contenido/2

Obtener contenido por nombre (GET)

URL: /contenido/nombre/:nombreContenido

GET http://localhost:3000/contenido/nombre/The Umbrella Academy

Obtener contenido por género (GET)

GET http://localhost:3000/contenido/genero/Suspenso

Crear nuevo contenido (POST)

URL: http://localhost:3000/contenido
```
{
  "titulo": "New contenido",
  "categoria": "Película",
  "resumen": "lorem",
  "temporadas": "2",
  "poster": "poster_url.jpg"
}
```
Actualizar contenido por ID (PUT)

URL: /contenido/:contenidoID

URL: http://localhost:3000/contenido/{contenidoID}

http://localhost:3000/contenido/11
```
{
  "titulo": "Título actualizado",
  "categoria": "Serie",
  "resumen": "Resumen actualizado",
  "temporadas": "2",
  "poster": "nuevo_poster_url.jpg"
}
```
Eliminar contenido por ID (DELETE)

URL: /contenido/:contenidoID

DELETE http://localhost:3000/contenido/1





