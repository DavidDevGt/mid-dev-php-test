# Prueba Tecnica - Desarrollador Middle - David Vargas

## Tecnologias Usadas

- Frontend: HTML5, CSS3 y JavaScript
- Backend: PHP, MySQL y Linux, Python para scripting
- CI/CD: Git, GitHub

## **Cómo testear los ejercicios**

Sigue estos pasos para validar el funcionamiento de cada ejercicio de manera sencilla:

### **1. Landing Page (HTML/CSS/JS + PHP)**

1. Abre la landing page en tu navegador:

   ```bash
   http://localhost/landing/index.html
   ```

2. Llena el formulario con datos **válidos** y **no válidos** para verificar las validaciones en JavaScript.
3. Envía el formulario y confirma que se envía correctamente al backend en PHP.

**Validaciones del formulario:**

- **Nombre**: Campo requerido
- **Email**: Formato válido requerido
- **Contraseña**: Mínimo 8 caracteres, 2 mayúsculas, 1 dígito y 1 símbolo especial
- **Fecha de nacimiento**: Debes ser mayor de 18 años
- **Términos y condiciones**: Debe ser aceptado

---

### **2. Backend en PHP (POST + MySQL)**

1. Puedes usar el formulario anterior o herramientas como Postman:

   ```bash
   POST http://localhost/api/registro.php
   Content-Type: application/json

   {
     "firstName": "Usuario Prueba",
     "email": "usuario@test.com",
     "password": "Pass123!@",
     "birthDate": "1990-01-01"
   }
   ```

2. Verifica en la base de datos que:

   * Los datos fueron guardados.
   * La contraseña está encriptada (hash).
   * Se generó un token JWT para la respuesta.

**Respuesta exitosa:**

```json
{
  "success": true,
  "message": "Usuario registrado correctamente",
  "token": "eyJ...",
  "user": {
    "id": 1,
    "firstName": "Usuario Prueba",
    "email": "usuario@test.com"
  }
}
```

---

### **3. Consultas SQL (MySQL)**

1. Con la base de datos ya poblada, ingresa al cliente MySQL:

   ```bash
   mysql -u root -p
   USE prueba_tecnica_db;
   ```

2. Ejecuta las consultas del archivo [`sql/queries.sql`](sql/queries.sql):

   * **Usuarios registrados en los últimos 30 días:**

     ```sql
     SELECT *
     FROM usuarios
     WHERE fecha_registro >= NOW() - INTERVAL 30 DAY
     ORDER BY fecha_registro DESC;
     ```

   * **Contar usuarios con email de Gmail:**

     ```sql
     SELECT COUNT(*) AS total_gmail
     FROM usuarios
     WHERE LOWER(correo) LIKE '%@gmail.com';
     ```

   **Actualizar un registro:**

     ```sql
     UPDATE usuarios
     SET nombre = 'Usuario 10 Renombrado'
     WHERE id = 10;
     ```

   * **Eliminar un registro:**

     ```sql
     DELETE FROM usuarios
     WHERE id = 15;
     ```

---

### **4. Script en Python (CSV)**

1. Ejecuta el script con el archivo CSV:

   ```bash
   python3 scripts/analisis.py
   ```

2. Confirma que el resultado muestra:

   * Promedio de precios.
   * Producto con mayor stock.
   * Total de productos.

**El script utiliza el archivo:** [`scripts/productos_1000.csv`](scripts/productos_1000.csv)

---

## **Configuración del entorno**

El proyecto utiliza un archivo `.env` con la siguiente configuración:

```txt
DSN=mysql:host=localhost;dbname=prueba_tecnica_db;charset=utf8mb4
DB_USER=root
DB_PASS=MiPasswordSegura5678
```

**Nota:** Asegúrate de que la base de datos `prueba_tecnica_db` exista y el usuario tenga los permisos necesarios.
