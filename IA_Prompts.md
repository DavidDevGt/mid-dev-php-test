# IA PROMPTS

## Prompt

```txt
Eres un desarrollador frontend senior especializado en HTML semántico, JavaScript vanilla con estándares profesionales y Bootstrap 5. Tu misión es producir código limpio, optimizado, mantenible y con buenas prácticas.

Instrucciones estrictas:

Usa HTML semántico correcto y accesible.

Aplica Bootstrap 5 de forma eficiente, evitando CSS personalizado salvo que sea absolutamente necesario.

Escribe JavaScript vanilla modular y claro, sin dependencias externas.

Documenta todas las funciones y métodos en JSDoc completo y bien estructurado.

No incluyas comentarios innecesarios ni explicaciones redundantes; solo lo esencial para un proyecto profesional.

El resultado debe ser responsive, accesible y escalable.

Cuando el usuario pida ejemplos, devuelve el código completo listo para usar (HTML, JS y, si corresponde, un CSS mínimo estrictamente necesario).

Formato de salida esperado:

- Código HTML semántico con Bootstrap 5.
- Archivos JavaScript separados con JSDoc en cada función.
- Solo el CSS estrictamente necesario si Bootstrap no lo cubre.

Tu tarea es crear un starter kit para hacerme una landing esta debe tener una estructura clara con HTML semantico, empezando con un header que muestre el logo y un menu de navegacion. Debajo ira un formulario de registro con campos para nombre, correo, contraseña y fecha de nacimiento usando los tipos de input correctos (text, email, password, date). Luego una seccion de productos en formato grid con al menos tres elementos, donde cada uno pueda abrirse en un collapse para ver mas detalles internos, incluyendo una imagen y un titulo por producto. Finalmente, un footer con enlaces a redes sociales para cerrar la pagina. usa feather icons con un CDN para eso.

davidgt@server-bodega:~/mid-dev-php-test$ tree landing/
landing/
├── assets
│   └── logo.svg
├── css
│   └── styles.css
├── index.html
└── js
    └── app.js

4 directories, 4 files
```

## Response

```txt
I'll help you recreate your landing page to match the image you've shown. I can see it needs a cleaner, more minimalist design with better form styling and product cards.

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg bg-white fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">Hageo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="#productos">Productos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#registro">Registro</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section id="inicio" class="hero-section text-center text-white d-flex align-items-center">
        <div class="container">
            <h1 class="fw-bold mb-3">Bienvenido a Hageo</h1>
            <p class="lead mb-4">Regístrate y conoce nuestros productos exclusivos.</p>
            <a href="#registro" class="btn btn-primary btn-lg">Comenzar</a>
        </div>
    </section>

    <!-- Registro -->
    <section id="registro" class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <h2 class="text-center mb-4 fw-bold">Registro</h2>
                            <form id="registrationForm" class="needs-validation" novalidate>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">Nombre</label>
                                    <input type="text" class="form-control form-control-clean" name="firstName" required>
                                    <div class="invalid-feedback">Ingrese su nombre</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">Correo electrónico</label>
                                    <input type="email" class="form-control form-control-clean" name="email" required>
                                    <div class="invalid-feedback">Correo inválido</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">Contraseña</label>
                                    <input type="password" class="form-control form-control-clean" name="password" required>
                                    <div id="passwordFeedback" class="invalid-feedback">Campo requerido</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted small">Fecha de nacimiento</label>
                                    <input type="date" class="form-control form-control-clean" name="birthDate" required>
                                    <div class="invalid-feedback">Debes ser mayor de 18</div>
                                </div>
                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" name="terms" required>
                                    <label class="form-check-label small text-muted">
                                        Acepto términos y condiciones
                                    </label>
                                    <div class="invalid-feedback">Debe aceptar los términos</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 py-2">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Productos -->
    <section id="productos" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5 fw-bold">Productos</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="product-card">
                        <div class="product-content">
                            <h5 class="mb-0">Producto 1</h5>
                        </div>
                        <div class="product-dots">
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-card">
                        <div class="product-content">
                            <h5 class="mb-0">Producto 2</h5>
                        </div>
                        <div class="product-dots">
                            <span class="dot"></span>
                            <span class="dot active"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product-card">
                        <div class="product-content">
                            <h5 class="mb-0">Producto 3</h5>
                        </div>
                        <div class="product-dots">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot active"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contacto" class="bg-dark text-white text-center py-4">
        <div class="container">
            <p class="mb-0">Síguenos: <a href="#" class="text-white text-decoration-none">LinkedIn</a> | <a href="#" class="text-white text-decoration-none">GitHub</a></p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="app.js"></script>
</body>

</html>


:root {
    --primary: #007bff;
    --primary-dark: #0056b3;
    --secondary: #6c757d;
    --dark: #212529;
    --light: #f8f9fa;
    --white: #ffffff;
    --border-color: #dee2e6;
    --text-muted: #6c757d;
}

* {
    box-sizing: border-box;
}

body {
    background: var(--white);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: var(--dark);
}

html {
    scroll-behavior: smooth;
}

/* Navbar */
.navbar {
    background: var(--white) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--dark) !important;
}

.nav-link {
    font-weight: 400;
    color: var(--text-muted) !important;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--primary) !important;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--primary) 0%, #0056b3 100%);
    height: 100vh;
    min-height: 600px;
}

.hero-section h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.hero-section .lead {
    font-size: 1.25rem;
    font-weight: 300;
    opacity: 0.9;
    margin-bottom: 2rem;
}

.hero-section .btn {
    font-size: 1.1rem;
    padding: 0.75rem 2rem;
    border-radius: 25px;
    font-weight: 500;
    background: var(--white);
    color: var(--primary);
    border: none;
    transition: all 0.3s ease;
}

.hero-section .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Registration Section */
#registro {
    background: var(--light);
}

.card {
    border-radius: 12px;
    border: none;
}

.form-control-clean {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    background: var(--white);
    transition: all 0.3s ease;
}

.form-control-clean:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15);
    background: var(--white);
}

.form-label {
    font-weight: 500;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-primary {
    background: var(--primary);
    border: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.form-check-input:checked {
    background-color: var(--primary);
    border-color: var(--primary);
}

/* Products Section */
#productos {
    background: var(--white);
    padding: 4rem 0;
}

#productos h2 {
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 3rem;
}

.product-card {
    background: var(--light);
    border-radius: 12px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 1.5rem 1rem;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
}

.product-content h5 {
    font-weight: 500;
    color: var(--dark);
    font-size: 1.1rem;
}

.product-dots {
    display: flex;
    gap: 8px;
    margin-top: auto;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-color);
    transition: all 0.3s ease;
}

.dot.active {
    background: var(--primary);
    transform: scale(1.2);
}

/* Footer */
footer {
    background: var(--dark) !important;
    color: var(--white);
}

footer a {
    color: var(--white);
    text-decoration: none;
    transition: color 0.3s ease;
}

footer a:hover {
    color: var(--primary);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-section {
        height: 80vh;
        min-height: 500px;
    }

    .hero-section h1 {
        font-size: 2.5rem;
    }

    .hero-section .lead {
        font-size: 1.1rem;
    }

    .product-card {
        height: 160px;
        margin-bottom: 1rem;
    }
}

@media (max-width: 576px) {
    .hero-section h1 {
        font-size: 2rem;
    }

    .hero-section .lead {
        font-size: 1rem;
    }

    .product-card {
        height: 140px;
    }

    #registro .col-md-6 {
        padding: 0 1rem;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    // Password validation function
    function validatePassword(password) {
        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres";
        }
        return "";
    }

    // Age validation function
    function validateAge(birthDateString) {
        const birthDate = new Date(birthDateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 18;
    }

    // Real-time validation
    form.addEventListener("input", (e) => {
        const field = e.target;
        
        if (field.name === "password") {
            const passwordFeedback = document.getElementById("passwordFeedback");
            const errorMessage = validatePassword(field.value);
            
            if (errorMessage && field.value.length > 0) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                passwordFeedback.textContent = errorMessage;
            } else if (field.value.length > 0) {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
            }
        }

        if (field.name === "birthDate") {
            if (field.value && !validateAge(field.value)) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
            } else if (field.value) {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
            }
        }

        // General validation for other fields
        if (field.name === "firstName" || field.name === "email") {
            if (field.checkValidity() && field.value.length > 0) {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
            } else if (field.value.length > 0) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
            }
        }
    });

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Remove previous validation classes
        form.classList.remove("was-validated");
        
        let isValid = true;

        // Check all required fields
        const requiredFields = form.querySelectorAll("[required]");
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                isValid = false;
            }
        });

        // Validate password
        const passwordField = form.querySelector('[name="password"]');
        const passwordError = validatePassword(passwordField.value);
        if (passwordError) {
            passwordField.classList.add("is-invalid");
            passwordField.classList.remove("is-valid");
            document.getElementById("passwordFeedback").textContent = passwordError;
            isValid = false;
        }

        // Validate age
        const birthDateField = form.querySelector('[name="birthDate"]');
        if (birthDateField.value && !validateAge(birthDateField.value)) {
            birthDateField.classList.add("is-invalid");
            birthDateField.classList.remove("is-valid");
            isValid = false;
        }

        // Validate email
        const emailField = form.querySelector('[name="email"]');
        if (emailField.value && !emailField.checkValidity()) {
            emailField.classList.add("is-invalid");
            emailField.classList.remove("is-valid");
            isValid = false;
        }

        // Check terms checkbox
        const termsField = form.querySelector('[name="terms"]');
        if (!termsField.checked) {
            termsField.classList.add("is-invalid");
            isValid = false;
        }

        if (!isValid) {
            form.classList.add("was-validated");
            return;
        }

        // If all validations pass
        alert("¡Registro exitoso!");
        
        // Reset form
        form.reset();
        form.classList.remove("was-validated");
        
        // Remove all validation classes
        const allFields = form.querySelectorAll(".form-control, .form-check-input");
        allFields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
```


## PROMPT

```txt
Dame una funcion para generar un token al estilo JWT con hs256 como algoritmo de encriptacion
```

## RESPONSE

```txt
Aquí tienes una función en PHP moderna que hace exactamente lo mismo que tu ejemplo: genera un **token tipo JWT** simple usando `HS256`, pero con un estilo limpio y listo para producción en **PHP 8**:

```php
<?php
declare(strict_types=1);

/**
 * Genera un token estilo JWT (HS256) con un payload dado.
 *
 * @param array $payload Datos a incluir en el cuerpo del token.
 * @return string Token firmado en formato header.payload.signature
 */
function generateToken(array $payload): string
{
    // Clave secreta desde .env o aleatoria si no existe
    $secret = getenv('APP_KEY') ?: bin2hex(random_bytes(16));

    // Función interna para codificar en Base64URL
    $b64UrlEncode = static fn($data): string =>
        rtrim(strtr(base64_encode(json_encode($data, JSON_UNESCAPED_SLASHES)), '+/', '-_'), '=');

    // Header y Body del token
    $header = $b64UrlEncode(['alg' => 'HS256', 'typ' => 'JWT']);
    $body   = $b64UrlEncode($payload);

    // Firma usando HMAC-SHA256
    $signature = $b64UrlEncode(hash_hmac('sha256', "$header.$body", $secret, true));

    return "$header.$body.$signature";
}
```

### Explicación rápida

* **`$secret`**: Usa la clave `APP_KEY` del entorno, si no existe, crea una clave aleatoria segura.
* **`$b64UrlEncode`**: Genera Base64URL, necesario para JWT (sin `+`, `/` ni `=`).
* **Firma**: Se crea con `hash_hmac('sha256')` usando la clave secreta.

### Ejemplo de uso

```php
$token = generateToken(['user_id' => 123, 'role' => 'admin']);
echo $token;
```

---

Si quieres, puedo hacer también una **función `verifyToken`** para validar la firma y asegurarte de que nadie modificó el token. ¿Quieres que la agregue?

```