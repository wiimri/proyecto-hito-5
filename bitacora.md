# Bitácora de Proyecto - Hito 5: Presentación del Proyecto

Esta bitácora detalla la estructura final de carpetas de tu proyecto en la carpeta `proyecto-hito5-main`, cómo se configuró para ejecutarse correctamente, el flujo técnico detallado de la autenticación con JWT (JSON Web Tokens) y un guión e instrucciones paso a paso para que grabes tu video de presentación de 3 a 5 minutos.

---

## 1. Estructura de Carpetas

Se ha organizado el proyecto en la raíz de `proyecto-hito5-main` con carpetas con inicial mayúscula en español/inglés técnico, como fue solicitado:

- **`Backend/`**: API REST en Node.js y Express con persistencia de base de datos en Neon (PostgreSQL).
- **`Cliente/`**: Aplicación de frontend en React construida y optimizada mediante Vite.
- **`documentation/`**: Contiene la documentación técnica previa, diagramas y scripts de base de datos SQL (`schema.sql` y `seed.sql`).
- **`scripts/`**: Contiene el archivo `dev.js`, el cual es un ejecutor de procesos concurrentes para levantar ambos servicios en local de forma simultánea.

---

## 2. Instrucciones para la Ejecución Local

Para levantar el proyecto completo en tu computadora local:

1. **Instalar dependencias**:
   Ejecuta el siguiente comando en la raíz del directorio `proyecto-hito5-main` (esto instalará las dependencias en la raíz, en `Backend` y en `Cliente`):
   ```bash
   npm install
   ```

2. **Levantar el entorno de desarrollo**:
   Levanta de forma concurrente el backend (en el puerto `3000`) y el frontend (en el puerto `5173`):
   ```bash
   npm start
   ```

3. **Verificar el estado**:
   - Backend local: [http://localhost:3000/api/health](http://localhost:3000/api/health)
   - Cliente local: [http://localhost:5173](http://localhost:5173)

---

## 3. Arquitectura Técnica de JWT (¿Dónde se ejecuta?)

El flujo de autenticación mediante JWT se divide entre la firma (Backend), la verificación (Backend), el almacenamiento (Cliente) y el envío en cabeceras (Cliente). A continuación se explica línea por línea:

### A. Firma y Generación (Backend)
1. **Firma del Token**: En el archivo [Backend/src/utils/token.js](file:///c:/CARPETA%20COMPARTIDA/UNI/Desafiolatam/Hitos/proyecto-hito5-main/Backend/src/utils/token.js), la función `signToken(user)` utiliza la librería `jsonwebtoken` y la variable de entorno `JWT_SECRET` para firmar un token con duración de 8 horas:
   ```javascript
   function signToken(user) {
     return jwt.sign(
       { id: user.id, email: user.email, fullName: user.fullName },
       jwtSecret,
       { expiresIn: "8h" }
     );
   }
   ```
2. **Generación al Registrarse / Iniciar Sesión**: En el archivo [Backend/src/routes/auth.routes.js](file:///c:/CARPETA%20COMPARTIDA/UNI/Desafiolatam/Hitos/proyecto-hito5-main/Backend/src/routes/auth.routes.js), cuando el usuario completa con éxito las llamadas de registro o inicio de sesión:
   - Registro (Línea 23): `response.status(201).json({ user, token: signToken(user) });`
   - Login (Línea 42): `return response.json({ user, token: signToken(user) });`

### B. Verificación y Protección de Rutas (Backend)
1. **Middleware de Autenticación**: En el archivo [Backend/src/middlewares/auth.middleware.js](file:///c:/CARPETA%20COMPARTIDA/UNI/Desafiolatam/Hitos/proyecto-hito5-main/Backend/src/middlewares/auth.middleware.js), el middleware `authMiddleware` captura la cabecera `Authorization`, extrae el esquema `Bearer`, verifica su validez usando la función `verifyToken` y adjunta el payload decodificado a la petición (`request.user`):
   ```javascript
   function authMiddleware(request, response, next) {
     const header = request.headers.authorization || "";
     const [scheme, token] = header.split(" ");
     // ... validación de esquema Bearer ...
     try {
       request.user = verifyToken(token);
       return next();
     } catch (error) {
       return response.status(401).json({ message: "Token invalido", errors: [] });
     }
   }
   ```
2. **Uso en Rutas Protegidas**: Este middleware se aplica a todas las peticiones que requieren inicio de sesión, como crear un producto (POST `/api/posts`), editarlo (PUT `/api/posts/:id`), eliminarlo (DELETE `/api/posts/:id`) o consultar favoritos.

### C. Almacenamiento y Persistencia (Cliente)
1. **Guardado en Contexto y LocalStorage**: En el archivo [Cliente/src/context/MarketplaceContext.jsx](file:///c:/CARPETA%20COMPARTIDA/UNI/Desafiolatam/Hitos/proyecto-hito5-main/Cliente/src/context/MarketplaceContext.jsx), las funciones `login` y `register` reciben el token desde la API y lo guardan dentro del estado `user`. 
   - Cuando el estado `user` cambia, un `useEffect` (Líneas 100-106) se encarga de guardar o eliminar el token en el almacenamiento local del navegador (`localStorage`) bajo la clave `"marketplace-session"`.

### D. Inclusión en Peticiones del Cliente (Cliente)
1. **Envío de Cabeceras**: En el archivo [Cliente/src/services/api.js](file:///c:/CARPETA%20COMPARTIDA/UNI/Desafiolatam/Hitos/proyecto-hito5-main/Cliente/src/services/api.js), la función auxiliar `authHeaders(token)` genera el formato requerido por el backend:
   ```javascript
   function authHeaders(token) {
     return token ? { Authorization: `Bearer ${token}` } : {};
   }
   ```
   Esta función se inyecta en peticiones protegidas como `createPost`, `updatePost` y `deletePost` enviando el token en la cabecera de la llamada HTTP.

---

## 4. Guía Paso a Paso para Mostrar Todo en el Video

Para evidenciar el correcto funcionamiento técnico en tu video, abre las Herramientas de Desarrollador de Google Chrome (`F12` o Clic Derecho -> Inspeccionar) y realiza el siguiente recorrido:

1. **Mostrar la Base de Datos Local / Conexión**:
   - Muestra la URL local `/api/health/db` en el navegador. Mostrará un JSON confirmando la conexión con Neon PostgreSQL.
2. **Pestaña Application (Aplicación) - LocalStorage**:
   - Ve a la pestaña **Application** (en español: Aplicación) y en la barra izquierda selecciona **Local Storage** -> `http://localhost:5173`.
   - Muestra que está vacío antes de iniciar sesión.
3. **Flujo de Registro / Login**:
   - Registra un nuevo usuario en la interfaz del cliente.
   - Observa inmediatamente que en el Local Storage aparece la clave `marketplace-session` con el JSON del usuario y la propiedad `token` que contiene el JWT.
4. **Pestaña Network (Red) - Evidencia del Token**:
   - Ve a la pestaña **Network** (Red) y limpia el historial.
   - Ve a la sección de "Publicar un Producto" en tu aplicación cliente y crea una publicación de prueba.
   - Haz clic en la llamada a la API en la pestaña Network (será una llamada tipo `POST` a `/posts`).
   - Ve al apartado **Headers** (Cabeceras) de esa petición y desliza hacia abajo hasta **Request Headers** (Cabeceras de la petición). Muestra a la cámara la línea:
     `Authorization: Bearer <tu_token_jwt_aquí>`
   - Esto demuestra que el cliente está autorizando correctamente el endpoint protegido usando JWT.

---

## 5. Guión Sugerido para el Video (3 a 5 Minutos)

*Nota: Lee este guión de forma natural. Te ayudará a cumplir con todos los requisitos de la rúbrica para asegurar la máxima calificación.*

### Introducción (0:00 - 0:45)
> "Hola a todos, mi nombre es **[Tu Nombre Completo]** y en esta oportunidad les presentaré el proyecto final para el Hito 5 de la carrera: **Mercado Vecino**.
> 
> La problemática que detectamos para este desarrollo fue la falta de un espacio centralizado y confiable para que los vecinos de comunidades locales puedan comercializar e intercambiar productos o servicios de forma directa. La necesidad principal recaía en pequeños emprendedores y residentes locales que requerían una plataforma intuitiva y segura para publicar anuncios, gestionar favoritos e interactuar con sus vecinos sin intermediarios costosos."

### Cómo Satisface el Proyecto esta Necesidad (0:45 - 1:45)
> "Para resolver esto, diseñamos **Mercado Vecino**, un marketplace web estructurado con una arquitectura cliente-servidor robusta.
> 
> Como pueden ver en la pantalla, en la parte del **Cliente**, desarrollado en React con Vite, ofrecemos una interfaz interactiva y animada donde los usuarios pueden buscar publicaciones, filtrar por categorías y marcar productos favoritos.
> 
> En la parte del **Backend**, construido con Node.js y Express, proveemos una API REST segura que se conecta a una base de datos PostgreSQL alojada en Neon. Toda la información, desde el catálogo hasta las sesiones, se persiste de forma real en la nube."

### Evidencia Técnica: JWT en Vivo (1:45 - 2:45)
> "Uno de los aspectos más importantes de la seguridad es la autenticación basada en **JWT**. 
> 
> En el código del backend, dentro de `Backend/src/utils/token.js`, firmamos el token al iniciar sesión, y en `Backend/src/middlewares/auth.middleware.js` verificamos que el token sea válido antes de permitir acciones como publicar o editar.
> 
> En el navegador, si abro las Herramientas de Desarrollador, puedo mostrarles que al iniciar sesión, el cliente recibe el JWT y lo almacena localmente en el `localStorage` bajo la clave `marketplace-session`. 
> *(Muestra la pestaña Application -> Local Storage en el video)*.
> 
> Y cuando creamos un nuevo anuncio, la aplicación cliente adjunta automáticamente el token en los headers de la petición HTTP. Como se observa en la pestaña Red, la cabecera `Authorization` viaja con el esquema `Bearer` seguido del token.
> *(Muestra la petición POST de publicación y la cabecera Authorization en la pestaña Network)*."

### Conocimientos Claves Aplicados (2:45 - 3:30)
> "Los conocimientos clave que hicieron posible este desarrollo fueron la construcción de APIs REST usando Express, la modelación de bases de datos relacionales con PostgreSQL, el consumo de endpoints asíncronos mediante Fetch en React y el control de estado global con React Context. Estos módulos de la carrera nos dieron los cimientos prácticos para integrar exitosamente backend y frontend."

### Dificultades, Disfrute y Metodología (3:30 - 4:30)
> "La principal dificultad técnica que enfrentamos fue la gestión del estado de autenticación y la sincronización del Local Storage para mantener la sesión del usuario activa al recargar la página. Lo resolvimos implementando un Context Provider en React que actúa como una fuente única de verdad para el cliente.
> 
> Lo que más disfruté del desarrollo fue ver cómo el frontend cobraba vida al conectarse directamente con la base de datos real en Neon, pasando de datos simulados a una aplicación completamente funcional.
> 
> Por último, la metodología de aprendizaje de Desafío Latam fue de gran aporte. Trabajar en hitos progresivos nos permitió estructurar el desarrollo paso a paso, recibir feedback constructivo a tiempo y aplicar de inmediato los conceptos teóricos directamente sobre el código."

### Despedida (4:30 - 5:00)
> "Agradezco mucho su atención y el acompañamiento durante todo este proceso de aprendizaje. ¡Muchas gracias!"
