CREATE DATABASE IF NOT EXISTS prueba_tecnica_db;
USE prueba_tecnica_db;
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(160) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- CONSULTAS SOLICITADAS EN EL DOC
SELECT *
FROM usuarios
WHERE fecha_registro >= NOW() - INTERVAL 30 DAY
ORDER BY fecha_registro DESC;
-- separador
SELECT COUNT(*) AS total_gmail
FROM usuarios
WHERE LOWER(correo) LIKE '%@gmail.com';
-- separador
UPDATE usuarios
SET nombre = 'Usuario 10 Renombrado'
WHERE id = 10;
-- separador
DELETE FROM usuarios
WHERE id = 15;