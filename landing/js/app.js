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

    // Real-time validation
    form.addEventListener("input", (e) => {
        const field = e.target;

        // Password
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

        // Fecha de nacimiento
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

        // Nombre y correo
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


    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // Check all required fields
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

        // Validate password
        const passwordField = form.querySelector('[name="password"]');
        const passwordError = validatePassword(passwordField.value);
        if (passwordError) {
            passwordField.classList.add("is-invalid");
            passwordField.classList.remove("is-valid");
            document.getElementById("passwordError").textContent = passwordError;
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

        if (!isValid) {
            return;
        }

        // Mock backend call - en producción reemplazar con fetch real
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        // Simulación de llamada al backend
        console.log("Enviando datos al backend:", userData);

        // Aquí iría la llamada real al backend PHP:
        /*
        fetch('/api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("¡Registro exitoso!");
                form.reset();
            } else {
                alert("Error en el registro: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error de conexión");
        });
        */

        // Mock response
        setTimeout(() => {
            alert("¡Registro exitoso! (Simulado)");
            form.reset();

            // Remove all validation classes
            const allFields = form.querySelectorAll(".form-control, .form-check-input");
            allFields.forEach(field => {
                field.classList.remove("is-valid", "is-invalid");
            });
        }, 500);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});