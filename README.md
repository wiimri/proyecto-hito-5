# Mercado Vecino - Hito 5 Presentacion del Proyecto

Este repositorio corresponde al **Hito 5** del proyecto final **Mercado Vecino**.

El objetivo de este hito es presentar y defender el proyecto completo: explicar la problematica, mostrar la solucion funcionando, mencionar las tecnologias usadas y demostrar dominio tecnico ante el docente.

> Nota: este repositorio conserva la estructura del proyecto para que el docente pueda revisar el contexto tecnico, pero la entrega esta enfocada en la **presentacion final del Hito 5**.

---

## 1. Que es Mercado Vecino

**Mercado Vecino** es un marketplace local pensado para que personas de una comunidad puedan comprar y vender productos en un espacio ordenado.

La problematica detectada es que muchas publicaciones locales quedan dispersas en redes sociales, grupos de mensajeria o conversaciones informales. Esto dificulta buscar productos, comparar informacion y administrar ofertas.

La solucion permite:

- Explorar publicaciones.
- Filtrar o buscar productos.
- Revisar el detalle de una publicacion.
- Registrar usuarios.
- Iniciar sesion.
- Crear publicaciones con informacion e imagenes.
- Proteger acciones privadas mediante autenticacion.

---

## 2. Objetivo del Hito 5

El Hito 5 pide presentar el proyecto de forma clara y demostrar dominio del tema.

La presentacion debe cubrir:

1. Que problema se detecto.
2. Que usuarios tienen esa necesidad.
3. Como la aplicacion satisface la necesidad.
4. Que funcionalidades se implementaron.
5. Que tecnologias se usaron.
6. Que dificultades aparecieron.
7. Como se resolvieron esas dificultades.
8. Que aprendizajes dejo el desarrollo.

---

## 3. Estructura del repositorio

```text
proyecto-hito5-main/
  .local-postgres-data/   Carpeta local para datos PostgreSQL, se mantiene vacia en GitHub
  Backend/                API REST con Express, JWT, CORS, Multer y PostgreSQL
  Cliente/                Aplicacion React con Vite
  documentation/          Documentacion tecnica y SQL
  scripts/                Script para levantar cliente y backend juntos
  .gitignore              Reglas para no subir dependencias, secretos ni datos locales
  .local-postgres.log     Log local liviano
  package.json            Scripts generales del proyecto
  package-lock.json       Lockfile raiz
  README.md               Este documento
```

No se suben:

- `node_modules`
- archivos `.env`
- datos reales de `.local-postgres-data`
- builds generados como `dist`

---

## 4. Carpetas principales

### Backend

Ubicacion:

```text
Backend/
```

Contiene la API REST del proyecto.

Archivos importantes:

| Archivo | Funcion |
| --- | --- |
| `Backend/src/server.js` | Inicia el servidor Express. |
| `Backend/src/app.js` | Configura Express, CORS, rutas, JSON, uploads y errores. |
| `Backend/src/db.js` | Conexion a PostgreSQL y manejo de transacciones. |
| `Backend/src/routes/auth.routes.js` | Registro, login, bcrypt y entrega de JWT. |
| `Backend/src/utils/token.js` | Creacion y verificacion de tokens JWT. |
| `Backend/src/middlewares/auth.middleware.js` | Protege rutas privadas validando JWT. |
| `Backend/src/middlewares/upload.middleware.js` | Procesa imagenes con Multer. |
| `Backend/src/middlewares/validate.middleware.js` | Valida datos con Joi. |
| `Backend/tests/api.test.js` | Pruebas de API con Jest y Supertest. |

### Cliente

Ubicacion:

```text
Cliente/
```

Contiene el frontend hecho con React y Vite.

Archivos importantes:

| Archivo | Funcion |
| --- | --- |
| `Cliente/index.html` | HTML base donde React monta la aplicacion. |
| `Cliente/src/main.jsx` | Punto de entrada principal del frontend. |
| `Cliente/src/App.jsx` | Define rutas publicas y privadas. |
| `Cliente/styles.css` | CSS principal de la aplicacion. |
| `Cliente/src/context/MarketplaceContext.jsx` | Estado global: usuario, publicaciones, categorias y acciones. |
| `Cliente/src/services/api.js` | Comunicacion del frontend con la API. |
| `Cliente/src/pages/` | Vistas principales: inicio, login, registro, galeria, detalle, perfil y publicar. |
| `Cliente/src/components/` | Componentes reutilizables. |

### Documentation

Ubicacion:

```text
documentation/
```

Contiene documentacion del proyecto:

- Boceto de vistas.
- Navegacion.
- Dependencias.
- Modelo de base de datos.
- Contrato de API.
- Desarrollo frontend.
- Desarrollo backend.
- Despliegue.

SQL:

```text
documentation/database/schema.sql
documentation/database/seed.sql
```

---

## 5. Tecnologias usadas

### Frontend

| Tecnologia | Donde esta | Para que se usa |
| --- | --- | --- |
| HTML | `Cliente/index.html` | Documento base con `div#root`. |
| CSS | `Cliente/styles.css` | Estilos visuales de toda la aplicacion. |
| JavaScript / JSX | `Cliente/src/` | Logica e interfaz React. |
| React | `Cliente/src/main.jsx` y componentes | Construccion de interfaz por componentes. |
| Vite | `Cliente/package.json` | Servidor de desarrollo y build del cliente. |
| React Router | `Cliente/src/App.jsx` | Navegacion entre paginas. |
| Context API | `Cliente/src/context/MarketplaceContext.jsx` | Estado global. |
| Fetch API | `Cliente/src/services/api.js` | Consumo del backend. |
| FormData | `Cliente/src/services/api.js` | Envio de formularios con imagenes. |
| AnimeJS | `Cliente/src/hooks/useAnime.js` | Animaciones de interfaz. |

### Backend

| Tecnologia | Donde esta | Para que se usa |
| --- | --- | --- |
| Node.js | `Backend/` | Ejecutar JavaScript en servidor. |
| Express | `Backend/src/app.js` | Crear API REST. |
| CORS | `Backend/src/app.js` | Permitir comunicacion entre frontend y backend. |
| bcryptjs | `Backend/src/routes/auth.routes.js` | Hashear y comparar contrasenas. |
| JWT | `Backend/src/utils/token.js` y `auth.middleware.js` | Crear y validar sesion del usuario. |
| Joi | `Backend/src/schemas/` | Validar datos recibidos. |
| Multer | `Backend/src/middlewares/upload.middleware.js` | Recibir imagenes. |
| pg | `Backend/src/db.js` | Conexion a PostgreSQL. |
| Jest / Supertest | `Backend/tests/api.test.js` | Pruebas automaticas de la API. |

### Base de datos

| Tecnologia | Donde esta | Para que se usa |
| --- | --- | --- |
| PostgreSQL | Base de datos del proyecto | Persistencia relacional. |
| SQL | `documentation/database/schema.sql` | Creacion de tablas, relaciones, restricciones e indices. |
| Seed SQL | `documentation/database/seed.sql` | Datos iniciales de prueba. |

---

## 6. Donde esta el CSS

El CSS principal esta en:

```text
Cliente/styles.css
```

Se importa en:

```text
Cliente/src/main.jsx
```

Linea clave:

```js
import "../styles.css";
```

Este archivo define la apariencia de:

- Layout general.
- Navbar.
- Cards de publicaciones.
- Formularios.
- Galeria.
- Botones.
- Imagenes.
- Responsive design.

---

## 7. Donde esta el codigo principal

### Frontend

Punto de entrada:

```text
Cliente/src/main.jsx
```

Aqui React se monta en el HTML:

```js
createRoot(document.getElementById("root")).render(...)
```

Archivo de rutas:

```text
Cliente/src/App.jsx
```

Aqui se declaran rutas como:

```text
/
/login
/register
/publicaciones
/publicaciones/:id
/perfil
/publicar
/editar/:id
```

### Backend

Punto de entrada:

```text
Backend/src/server.js
```

Configuracion central:

```text
Backend/src/app.js
```

Aqui se configuran:

- CORS.
- JSON.
- Rutas.
- Uploads.
- Manejo de errores.

---

## 8. Donde y como se aplica CORS

CORS se aplica en:

```text
Backend/src/app.js
```

Sirve para permitir que el frontend consuma la API aunque esten en origenes distintos.

Ejemplo local:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

Como cambia el puerto, el navegador los considera origenes distintos.

En `app.js` se configura una lista de origenes permitidos y los headers necesarios:

```text
Content-Type
Authorization
```

`Authorization` es importante porque ahi viaja el token JWT.

Explicacion corta para la presentacion:

> CORS permite que el navegador autorice la comunicacion entre el cliente React y la API Express cuando estan en dominios o puertos distintos. No autentica usuarios; solo controla que origen puede llamar a la API.

---

## 9. Donde y como se aplica JWT

JWT se usa para proteger rutas privadas.

Archivos principales:

| Archivo | Funcion |
| --- | --- |
| `Backend/src/utils/token.js` | Firma y verifica tokens. |
| `Backend/src/routes/auth.routes.js` | Entrega token al registrarse o iniciar sesion. |
| `Backend/src/middlewares/auth.middleware.js` | Valida token en rutas privadas. |

Flujo:

1. El usuario inicia sesion.
2. El backend valida email y contrasena.
3. Si las credenciales son correctas, genera un JWT.
4. El frontend guarda ese token.
5. En acciones privadas, el frontend envia:

```text
Authorization: Bearer <token>
```

6. El middleware del backend valida el token.
7. Si es valido, permite continuar.
8. Si no es valido, responde error `401`.

Explicacion corta:

> JWT representa la sesion del usuario. Evita enviar la contrasena en cada peticion y permite proteger acciones como crear, editar o eliminar publicaciones.

---

## 10. bcrypt y JWT no son lo mismo

Es importante distinguirlos:

| Tecnologia | Para que sirve |
| --- | --- |
| bcrypt | Protege contrasenas mediante hash. |
| JWT | Protege la sesion y rutas privadas. |

En registro:

```text
contrasena -> bcrypt.hash -> password_hash
```

En login:

```text
contrasena ingresada + password_hash -> bcrypt.compare
```

Si el login es correcto:

```text
backend -> genera JWT -> frontend lo usa como Bearer token
```

---

## 11. Base de datos y SQL

La base de datos es PostgreSQL.

Archivos:

```text
documentation/database/schema.sql
documentation/database/seed.sql
```

Tablas principales:

| Tabla | Descripcion |
| --- | --- |
| `users` | Usuarios registrados y hash de contrasena. |
| `categories` | Categorias de publicaciones. |
| `posts` | Publicaciones del marketplace. |
| `post_images` | Imagenes asociadas a publicaciones. |
| `favorites` | Favoritos de usuarios. |
| `messages` | Mensajes entre usuarios. |

Relaciones:

```text
users 1:N posts
categories 1:N posts
posts 1:N post_images
users N:M posts mediante favorites
```

Tambien se usan:

- Claves primarias.
- Claves foraneas.
- Restricciones `CHECK`.
- Indices.
- Transacciones.

---

## 12. Flujo principal de la aplicacion

El flujo mas completo para explicar en la presentacion es crear una publicacion:

1. Usuario inicia sesion.
2. Backend valida credenciales.
3. bcrypt compara la contrasena con el hash.
4. Backend genera JWT.
5. Frontend guarda la sesion.
6. Usuario entra a `/publicar`.
7. React Router permite entrar porque hay usuario autenticado.
8. Formulario arma un `FormData`.
9. Frontend envia `POST /api/posts`.
10. Se envia `Authorization: Bearer <token>`.
11. Backend valida JWT.
12. Multer procesa imagenes.
13. Joi valida datos.
14. PostgreSQL inserta publicacion e imagenes.
15. Se usa transaccion para evitar datos incompletos.

---

## 13. Como ejecutar localmente

Instalar dependencias:

```bash
npm install
npm install --prefix Backend
npm install --prefix Cliente
```

Crear variables de entorno locales:

```text
Backend/.env
Cliente/.env
```

Ejemplo backend:

```env
PORT=3000
DATABASE_URL=postgresql://USUARIO:PASSWORD@HOST/neondb?sslmode=require
JWT_SECRET=clave_larga_y_segura
CORS_ORIGIN=http://localhost:5173
```

Ejemplo cliente:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Ejecutar:

```bash
npm start
```

URLs:

```text
Cliente: http://localhost:5173
Backend: http://localhost:3000/api/health
DB:      http://localhost:3000/api/health/db
```

---

## 14. Comandos utiles

```bash
npm start
npm run client
npm run client:build
npm run backend:dev
npm run backend:test
```

---

## 15. Pruebas

Las pruebas estan en:

```text
Backend/tests/api.test.js
```

Ejecutar:

```bash
npm run backend:test
```

Validan:

- API health.
- Categorias.
- Login invalido.
- Perfil sin token.
- Publicacion inexistente.
- Creacion protegida con token e imagen.

---

## 16. Que mostrar en la presentacion del Hito 5

Para la demo, se recomienda mostrar:

1. Pagina de inicio.
2. Galeria de publicaciones.
3. Filtro o busqueda.
4. Detalle de una publicacion.
5. Registro o login.
6. Perfil o formulario de publicacion.
7. Endpoint `api/health/db` para confirmar backend y base de datos.

---

## 17. Cobertura de rubrica Hito 5

| Requisito del Hito 5 | Como se cubre |
| --- | --- |
| Presentar el proyecto | Este README y la demo explican Mercado Vecino. |
| Mostrar funcionalidades | Inicio, publicaciones, detalle, login y publicar. |
| Explicar problema | Publicaciones locales dispersas. |
| Explicar solucion | Marketplace local con flujo de usuario completo. |
| Mencionar tecnologias | React, Vite, Express, PostgreSQL, JWT, bcrypt, CORS, Joi y Multer. |
| Explicar dificultad | Integracion frontend/backend, CORS y autenticacion. |
| Demostrar dominio | Se indican archivos clave y flujo tecnico completo. |

---

## 18. Resumen final

Este repositorio corresponde al **Hito 5** porque presenta el proyecto final y deja explicado como funciona Mercado Vecino.

La aplicacion integra:

- Frontend React.
- Backend Express.
- Autenticacion JWT.
- Contrasenas protegidas con bcrypt.
- CORS para comunicacion frontend/backend.
- PostgreSQL como base de datos.
- SQL documentado.
- Subida de imagenes con Multer.
- Validaciones con Joi.
- Pruebas con Jest y Supertest.

El objetivo de este README es que el docente pueda entender rapidamente que se hizo, donde esta cada parte importante y como se defiende tecnicamente el proyecto.
