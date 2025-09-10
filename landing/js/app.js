'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUppercase = (password.match(/[A-Z]/g) || []).length >= 2;
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!minLength || !hasUppercase || !hasDigit || !hasSpecialChar) {
            return "La contraseña debe tener al menos 8 caracteres, 2 mayúsculas, 1 dígito y 1 símbolo especial";
        }
        return "";
    }

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

    // Validación en tiempo real
    form.addEventListener("input", (e) => {
        const field = e.target;

        if (field.name === "password") {
            const errorDiv = document.getElementById("passwordError");
            const errorMessage = validatePassword(field.value);

            if (field.value.length === 0) {
                field.classList.remove("is-invalid", "is-valid");
                errorDiv.style.display = "none";
            } else if (errorMessage) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                errorDiv.textContent = errorMessage;
                errorDiv.style.display = "block";
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
                errorDiv.style.display = "none";
            }
        }

        if (field.name === "birthDate") {
            const errorDiv = field.nextElementSibling;
            if (field.value.length === 0) {
                field.classList.remove("is-invalid", "is-valid");
                errorDiv.style.display = "none";
            } else if (!validateAge(field.value)) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                errorDiv.style.display = "block";
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
                errorDiv.style.display = "none";
            }
        }

        if (field.name === "firstName" || field.name === "email") {
            const errorDiv = field.nextElementSibling;
            if (field.value.length === 0) {
                field.classList.remove("is-invalid", "is-valid");
                if (errorDiv) errorDiv.style.display = "none";
            } else if (field.checkValidity()) {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
                if (errorDiv) errorDiv.style.display = "none";
            } else {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                if (errorDiv) errorDiv.style.display = "block";
            }
        }
    });

    // Envío del formulario (real)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let isValid = true;

        // Validación de campos requeridos
        const requiredFields = form.querySelectorAll("[required]");
        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                isValid = false;
            } else if (field.type === 'checkbox' && !field.checked) {
                field.classList.add("is-invalid");
                isValid = false;
            }
        });

        // Validación de contraseña
        const passwordField = form.querySelector('[name="password"]');
        const passwordError = validatePassword(passwordField.value);
        if (passwordError) {
            passwordField.classList.add("is-invalid");
            passwordField.classList.remove("is-valid");
            document.getElementById("passwordError").textContent = passwordError;
            isValid = false;
        }

        // Validación de edad
        const birthDateField = form.querySelector('[name="birthDate"]');
        if (birthDateField.value && !validateAge(birthDateField.value)) {
            birthDateField.classList.add("is-invalid");
            birthDateField.classList.remove("is-valid");
            isValid = false;
        }

        // Validación de correo
        const emailField = form.querySelector('[name="email"]');
        if (emailField.value && !emailField.checkValidity()) {
            emailField.classList.add("is-invalid");
            emailField.classList.remove("is-valid");
            isValid = false;
        }

        if (!isValid) return;

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const submitBtn = form.querySelector('button[type="submit"]');

        try {
            submitBtn.disabled = true;
            submitBtn.dataset.prevText = submitBtn.textContent;
            submitBtn.textContent = "Enviando...";

            const API_BASE = window.location.hostname.includes('192.168.1.100')
                ? 'http://192.168.1.100:8036'
                : 'http://127.0.0.1:8036';

            const res = await fetch(`${API_BASE}/api/registro.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                cache: 'no-store',
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            if (data.success) {
                alert("¡Registro exitoso!");
                form.reset();
                form.querySelectorAll(".form-control, .form-check-input").forEach(f => {
                    f.classList.remove("is-valid", "is-invalid");
                });
            } else {
                alert("Error en el registro: " + (data.message ?? 'Desconocido'));
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.prevText || "Enviar";
            delete submitBtn.dataset.prevText;
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
});
