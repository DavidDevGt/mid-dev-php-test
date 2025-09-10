# Prueba Tecnica - Desarrollador Middle - David Vargas

## Tecnologias Usadas

- Frontend: HTML, CSS3 y Javascript
- Backend: PHP, MySQL y Linux, python para scripting
- CI/CD: Git, Github

## **Cómo testear los ejercicios**

Sigue estos pasos para validar el funcionamiento de cada ejercicio de manera sencilla:

### **1. Landing Page (HTML/CSS/JS + PHP)**

1. Abre la landing page en tu navegador:

   ```bash
   http://localhost/landing-page/index.html
   ```
2. Llena el formulario con datos **válidos** y **no válidos** para verificar las validaciones en JavaScript.
3. Envía el formulario y confirma que se envía correctamente al backend en PHP.

---

### **2. Backend en PHP (POST + MySQL)**

1. Puedes usar el formulario anterior o herramientas como Postman:

   ```bash
   POST http://localhost/api/register.php
   Content-Type: application/json

   {
     "nombre": "Usuario Prueba",
     "email": "usuario@test.com",
     "password": "123456"
   }
   ```
2. Verifica en la base de datos que:

   * Los datos fueron guardados.
   * La contraseña está encriptada.
   * Se generó un token para la petición.

---

### **3. Consultas SQL (MySQL)**

1. Con la base de datos ya poblada, ingresa al cliente MySQL:

   ```bash
   mysql -u root -p
   ```
2. Ejecuta las consultas para:

   * **Contar usuarios:**

     ```sql
     SELECT COUNT(*) FROM usuarios;
     ```
   * **Filtrar por dominio:**

     ```sql
     SELECT * FROM usuarios WHERE email LIKE '%@test.com';
     ```
   * **Actualizar un registro:**

     ```sql
     UPDATE usuarios SET nombre='Actualizado' WHERE id=1;
     ```
   * **Eliminar un registro:**

     ```sql
     DELETE FROM usuarios WHERE id=2;
     ```

---

### **4. Script en Python (CSV)**

1. Ejecuta el script con el archivo CSV:

   ```bash
   python3 procesar_productos.py productos.csv
   ```
2. Confirma que el resultado muestra:

   * Promedio de precios.
   * Producto con mayor stock.
   * Total de productos.

